using System;
using System.Data;
using System.Data.SqlClient;

namespace ConnnectToSqlServer
{
    public partial class Connection : Form
    {
       
        public Connection()
        {
            InitializeComponent();
        }

        SqlConnection cnn = null;
        string connetionString = "Data Source=DNQ1310\\SQLEXPRESS;Initial Catalog=STUDENT_MANAGEMENT;Integrated Security=True";
        private void btnConnect_Click(object sender, EventArgs e)
        {
            try
            {
                cnn = new SqlConnection(connetionString);
                cnn.Open();
                MessageBox.Show("Successful Connection !");
            }catch (Exception ex)
            {
                MessageBox.Show("Failed to connect to server \n" + ex.Message);
            }
        }

        private void btnDisconnect_Click(object sender, EventArgs e)
        {
            if(cnn != null && cnn.State == ConnectionState.Open)
            {
                cnn.Close();
                MessageBox.Show("Successful Disconection!");
            }
        }
    }
}