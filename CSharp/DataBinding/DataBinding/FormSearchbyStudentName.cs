using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace DataBinding
{
    public partial class FormSearchbyStudentName : Form
    {
        public FormSearchbyStudentName()
        {
            InitializeComponent();
        }

        private void sTUDENTBindingNavigatorSaveItem_Click(object sender, EventArgs e)
        {
            this.Validate();
            this.sTUDENTBindingSource.EndEdit();
            this.tableAdapterManager.UpdateAll(this.sTUDENT_MANAGEMENTDataSet);

        }

        private void FormSearchbyStudentName_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'sTUDENT_MANAGEMENTDataSet.STUDENT' table. You can move, or remove it, as needed.
            this.sTUDENTTableAdapter.Fill(this.sTUDENT_MANAGEMENTDataSet.STUDENT);

        }

        string connectionstring = "Data Source=DNQ1310\\SQLEXPRESS;Initial Catalog=STUDENT_MANAGEMENT;Integrated Security=True";
        SqlDataAdapter adapter = null;
        DataSet ds = null;
        private void txtStudentName_TextChanged(object sender, EventArgs e)
        {
            adapter = new SqlDataAdapter($"Select * from STUDENT where Name like '%{txtStudentName.Text}%'", connectionstring);
            ds = new DataSet();
            adapter.Fill(ds);
            dataGridView1.DataSource = ds.Tables[0];
        }
    }
}
