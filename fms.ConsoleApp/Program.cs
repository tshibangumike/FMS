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
    class Program
    {
        static void Main(string[] args)
        {

            var test = CredentialService.Encrypt("mike");

        }
    }
}
