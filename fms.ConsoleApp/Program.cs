using fms.Model;
using fms.Service;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace fms.ConsoleApp
{
    internal class Program
    {
        private static void Main(string[] args)
        {

            var test = CredentialService.Encrypt("bbU9tG!kH");

        }
    }
}
