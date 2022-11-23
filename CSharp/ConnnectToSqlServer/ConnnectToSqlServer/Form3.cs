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
    public partial class Form3 : Form
    {
        public Form3()
        {
            InitializeComponent();
        }

        SqlConnection cnn = null;
        string connetionString = "Data Source=DNQ1310\\SQLEXPRESS;Initial Catalog=STUDENT_MANAGEMENT;Integrated Security=True";
        private void Form3_Load(object sender, EventArgs e)
        {
            if (cnn == null)
                cnn = new SqlConnection(connetionString);
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand($"Select * from CLASS", cnn);
            lsbClass.ClearSelected();
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                string ClassID = reader.GetString(0);
                string ClassName = reader.GetString(1);
                int year = reader.GetInt32(2);
                string line = ClassID + "-" + ClassName + "-" + year.ToString();
                lsbClass.Items.Add(line);
            }
            cnn.Close();
        }

        private void lsbClass_SelectedIndexChanged(object sender, EventArgs e)
        {
            lsvStudent.Items.Clear();
            if (lsbClass.SelectedIndex == -1) return;
            string line = lsbClass.SelectedItem.ToString();
            string[] arr = line.Split('-');
            string classID = arr[0];

            if (cnn == null)
                cnn = new SqlConnection(connetionString);
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand($"Select * from STUDENT where ClassID='{classID}'", cnn);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                string studentID = reader.GetString(0);
                string name = reader.GetString(1);
                string classIDRows = reader.GetString(2);

                ListViewItem item = new ListViewItem(studentID);
                item.SubItems.Add(name);
                item.SubItems.Add(classIDRows);
                lsvStudent.Items.Add(item);
            }
            cnn.Close();
        }
    }
}
