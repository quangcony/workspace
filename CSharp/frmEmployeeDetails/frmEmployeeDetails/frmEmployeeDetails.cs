using System.Text;

namespace frmEmployeeDetails
{
    public partial class frmEmployeeDetails : Form
    {
        public frmEmployeeDetails()
        {
            InitializeComponent();
        }

        private void btnSave_Click(object sender, EventArgs e)
        {
            string EmployeeID = txtEmpID.Text;
            string EmployeeName = txtEmpName.Text;
            string Phone = mtxtPhone.Text;
            string Gender = (rdFemale.Checked ? "Female" : "Male");
            string Degree = cboDegree.Text;
            StringBuilder sb = new StringBuilder();
            sb.Append($"Employee ID: {EmployeeID}\n");
            sb.Append($"Employee Name: {EmployeeName}\n");
            sb.Append($"Phone: {Phone}\n");
            sb.Append($"Gender: {Gender}\n");
            sb.Append($"Degree: {Degree}");
            MessageBox.Show(sb.ToString(), "Employee Details");
        }

        private void btnCancel_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }
}