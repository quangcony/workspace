using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Data.SqlClient;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ConnnectToSqlServer
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }
        SqlConnection cnn = null;
        string connetionString = "Data Source=DNQ1310\\SQLEXPRESS;Initial Catalog=STUDENT_MANAGEMENT;Integrated Security=True";
        private void btnCaculate_Click(object sender, EventArgs e)
        {
                if(cnn == null)
                    cnn = new SqlConnection(connetionString);
                if(cnn.State == ConnectionState.Closed)
                    cnn.Open();
                SqlCommand command = new SqlCommand($"Select count(*) from STUDENT where ClassID='{txtClassID.Text}'", cnn);
                //Execute the sql command to return a value
                int rs = (int)command.ExecuteScalar();
                txtNumber.Text = rs.ToString();
                cnn.Close();
        }
    }
}
