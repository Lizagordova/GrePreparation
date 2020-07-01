using System.Data.SqlClient;

namespace GrePreparation.Helpers
{
	public class DatabaseHelper
	{
		public static SqlConnection OpenConnection()
		{
			var connectionString = @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=GrePreparation;Integrated Security=True;Connect Timeout=30;Encrypt=False;TrustServerCertificate=False;ApplicationIntent=ReadWrite;MultiSubnetFailover=False";
			var connection = new SqlConnection(connectionString);
			connection.Open();

			return connection;
		}

		public static void CloseConnection(SqlConnection connection)
		{
			connection.Close();
		}
	}
}