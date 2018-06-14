using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace fms.Service
{
    public class CredentialService
    {
        public static class Global
        {
            // set permutations
            public const string StrPermutation = "ouiveyxaqtd";
            public const int BytePermutation1 = 0x19;
            public const int BytePermutation2 = 0x59;
            public const int BytePermutation3 = 0x17;
            public const int BytePermutation4 = 0x41;
        }

        public static Dictionary<string, object> QueryCredentialByUsernameByPassword(string username, string password)
        {
            var records = SharedService.ExecuteGetSqlStoredProcedure(
                "[bbu].[Credential_querycredentialbyusernamebypassword]",
                new List<SqlParameter>
                {
                    new SqlParameter("@username", username),
                    new SqlParameter("@password", Encrypt(password))
                });
            if (records != null && records.Count == 1) return records[0];
            return null;
        }

        public static string Encrypt(string strData)
        {
            return Convert.ToBase64String(Encrypt(Encoding.UTF8.GetBytes(strData)));
        }

        public static string Decrypt(string strData)
        {
            return Encoding.UTF8.GetString(Decrypt(Convert.FromBase64String(strData)));
        }

        public static byte[] Encrypt(byte[] strData)
        {
            var passbytes =
                new PasswordDeriveBytes(Global.StrPermutation,
                    new byte[]
                    {
                        Global.BytePermutation1,
                        Global.BytePermutation2,
                        Global.BytePermutation3,
                        Global.BytePermutation4
                    });

            var memstream = new MemoryStream();
            var aes = new AesManaged();
            aes.Key = passbytes.GetBytes(aes.KeySize / 8);
            aes.IV = passbytes.GetBytes(aes.BlockSize / 8);

            var cryptostream = new CryptoStream(memstream,
                aes.CreateEncryptor(), CryptoStreamMode.Write);
            cryptostream.Write(strData, 0, strData.Length);
            cryptostream.Close();
            return memstream.ToArray();
        }

        public static byte[] Decrypt(byte[] strData)
        {
            var passbytes =
                new PasswordDeriveBytes(Global.StrPermutation,
                    new byte[]
                    {
                        Global.BytePermutation1,
                        Global.BytePermutation2,
                        Global.BytePermutation3,
                        Global.BytePermutation4
                    });

            var memstream = new MemoryStream();
            var aes = new AesManaged();
            aes.Key = passbytes.GetBytes(aes.KeySize / 8);
            aes.IV = passbytes.GetBytes(aes.BlockSize / 8);

            var cryptostream = new CryptoStream(memstream,
                aes.CreateDecryptor(), CryptoStreamMode.Write);
            cryptostream.Write(strData, 0, strData.Length);
            cryptostream.Close();
            return memstream.ToArray();
        }
    }
}
