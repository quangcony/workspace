using System;
using System.Windows.Forms;

namespace AddTwoNumbers
{
    public partial class Caculator : Form
    {
        public Caculator()
        {
            InitializeComponent();
        }

        private void btnAdd_Click(object sender, EventArgs e)
        {
            try
            {
                int num1 = Convert.ToInt32(txtNum1.Text);
                int num2 = Convert.ToInt32(txtNum2.Text);

                int rs = (num1 + num2);

                txtRs.Text = rs.ToString();

            }
            catch (Exception ex) 
            {
               MessageBox.Show("Error: " + ex.Message);
            }


        }

        private void txtNum1_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!(e.KeyChar >= '0' && e.KeyChar <= '9' || e.KeyChar == (char)8))
            {
                e.Handled = true;
            }
        }

        private void txtNum2_KeyPress(object sender, KeyPressEventArgs e)
        {
            if (!(e.KeyChar >= '0' && e.KeyChar <= '9' || e.KeyChar == (char)8))
            {
                e.Handled = true;
            }
        }
    }
}
