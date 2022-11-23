using System;
using System.Data;
using System.Data.SqlClient;
using System.Windows.Forms;

namespace DataBinding
{
    public partial class ListofStudentsbyClass : Form
    {
        public ListofStudentsbyClass()
        {
            InitializeComponent();
        }

        private void cLASSBindingNavigatorSaveItem_Click(object sender, EventArgs e)
        {
            this.Validate();
            this.cLASSBindingSource.EndEdit();
            this.tableAdapterManager.UpdateAll(this.sTUDENT_MANAGEMENTDataSet);

        }

        private void ListofStudentsbyClass_Load(object sender, EventArgs e)
        {
            // TODO: This line of code loads data into the 'sTUDENT_MANAGEMENTDataSet.STUDENT' table. You can move, or remove it, as needed.
            this.sTUDENTTableAdapter.Fill(this.sTUDENT_MANAGEMENTDataSet.STUDENT);
            this.cLASSTableAdapter.Fill(this.sTUDENT_MANAGEMENTDataSet.CLASS);

        }

        string connectionstring = "Data Source=DNQ1310\\SQLEXPRESS;Initial Catalog=STUDENT_MANAGEMENT;Integrated Security=True";
        DataSet ds = null;
        SqlDataAdapter adapter = null;
        string str;
        private void btnView_Click(object sender, EventArgs e)
        {
            str = $"Select * from STUDENT where ClassID='{cboClassID.Text}'";
            adapter = new SqlDataAdapter(str, connectionstring);
            ds = new DataSet();
            adapter.Fill(ds);
            dataGridView1.DataSource = ds.Tables[0];
        }


    }
}
