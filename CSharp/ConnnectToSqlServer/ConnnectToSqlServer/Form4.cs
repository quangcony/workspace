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
    public partial class Form4 : Form
    {
        public Form4()
        {
            InitializeComponent();
        }

        SqlConnection cnn = null;
        string connetionString = "Data Source=DNQ1310\\SQLEXPRESS;Initial Catalog=STUDENT_MANAGEMENT;Integrated Security=True";
        private void Form4_Load(object sender, EventArgs e)
        {
            ViewListOfStudents();
        }

        private void ViewListOfStudents()
        {
            lsvStudents.Items.Clear();
            if (cnn == null)
                cnn = new SqlConnection(connetionString);
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand($"Select * from STUDENT", cnn);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read())
            {
                string studentID = reader.GetString(0);
                string fName = reader.GetString(1);
                string classID = reader.GetString(2);

                ListViewItem item = new ListViewItem(studentID);
                item.SubItems.Add(fName);
                item.SubItems.Add(classID);

                lsvStudents.Items.Add(item);
            }
            cnn.Close();
        }

        int result = -1;

        private void btnInsert_Click(object sender, EventArgs e)
        {
            if (cnn == null)
                cnn = new SqlConnection(connetionString);
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand();
            command.CommandType = CommandType.Text;
            command.Connection = cnn;
            command.CommandText = "insert into Student(StudentID, Name, ClassID)" + "values(@StudentID, @Name, @ClassID)";

            SqlParameter sp1 = new SqlParameter("@StudentID", txtStudentID.Text);
            command.Parameters.Add(sp1);
            SqlParameter sp2 = new SqlParameter("@Name", txtFName.Text);
            command.Parameters.Add(sp2);
            SqlParameter sp3 = new SqlParameter("@ClassID", txtClassID.Text);
            command.Parameters.Add(sp3);

            try
            {
                result = command.ExecuteNonQuery();
                //Using ExecuteNonQuery if Sql command-insert, update, delete
            }catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "\nInsert record failed!");
            }

            if(result > 0)
            {
                ViewListOfStudents();
            }

        }
        //Dispaly a selected row of listview on Textbox
        private void lsvStudents_SelectedIndexChanged(object sender, EventArgs e)
        {
            if(lsvStudents.SelectedItems.Count > 0)
            {
                txtStudentID.Text = lsvStudents.SelectedItems[0].SubItems[0].Text;
                txtFName.Text = lsvStudents.SelectedItems[0].SubItems[1].Text;
                txtClassID.Text = lsvStudents.SelectedItems[0].SubItems[2].Text;
            }
        }

        private void btnUpdate_Click(object sender, EventArgs e)
        {
            if (cnn == null)
                cnn = new SqlConnection(connetionString);
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand($"update STUDENT set Name='{txtFName.Text}', ClassID='{txtClassID.Text}' where StudentID='{txtStudentID.Text}'", cnn);

            try
            {
                result = command.ExecuteNonQuery();
            }catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "\nupdate failed!");
            }

            if (result > 0)
            {
                ViewListOfStudents();
            }
        }

        private void btnDelete_Click(object sender, EventArgs e)
        {
            if (cnn == null)
                cnn = new SqlConnection(connetionString);
            if (cnn.State == ConnectionState.Closed)
                cnn.Open();
            SqlCommand command = new SqlCommand($"delete from STUDENT where StudentID='{txtStudentID.Text}'", cnn);

            try
            {
                result = command.ExecuteNonQuery();
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message, "\nDelete failed!");
            }

            if (result > 0)
            {
                ViewListOfStudents();
                txtStudentID.Text = "";
                txtFName.Text = "";
                txtClassID.Text = "";
            }
        }
    }
}
