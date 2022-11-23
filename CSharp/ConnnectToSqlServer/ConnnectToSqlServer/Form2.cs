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
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
        }

        SqlConnection cnn = null;
        string connetionString = "Data Source=DNQ1310\\SQLEXPRESS;Initial Catalog=STUDENT_MANAGEMENT;Integrated Security=True";
        private void btnViewDetail_Click(object sender, EventArgs e)
        {
            txtID.Text = "";
            txtName.Text = "";
            txtYear.Text = "";

            if (cnn == null)
                cnn = new SqlConnection(connetionString);
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();

            SqlCommand command = new SqlCommand();
            command.CommandType = CommandType.Text;
            command.CommandText = $"Select * from Class where ClassID='{txtClassID.Text}'";
            command.Connection = cnn;
            SqlDataReader reader = command.ExecuteReader();
            if(reader.Read())
            {
                txtID.Text = reader.GetString(0);
                txtName.Text = reader.GetString(1);
                txtYear.Text = reader.GetInt32(2).ToString();
            }
            cnn.Close();
        }

        private void btnViewList_Click(object sender, EventArgs e)
        {
            lsvStudents.Items.Clear();
            if (cnn == null)
                cnn = new SqlConnection(connetionString);
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand($"Select * from STUDENT where ClassID='{txtClassID.Text}'", cnn);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                string studentID = reader.GetString(0);
                string name = reader.GetString(1);
                string classID = reader.GetString(2);

                ListViewItem item = new ListViewItem(studentID);
                item.SubItems.Add(name);
                item.SubItems.Add(classID);
                lsvStudents.Items.Add(item);
            }
            cnn.Close();
        }
    }
}
