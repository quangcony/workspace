namespace ConnnectToSqlServer
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnCaculate = new System.Windows.Forms.Button();
            this.txtNumber = new System.Windows.Forms.TextBox();
            this.txtClassID = new System.Windows.Forms.TextBox();
            this.lbNoS = new System.Windows.Forms.Label();
            this.lbClassID = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // btnCaculate
            // 
            this.btnCaculate.Font = new System.Drawing.Font("Segoe UI", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnCaculate.Location = new System.Drawing.Point(236, 231);
            this.btnCaculate.Name = "btnCaculate";
            this.btnCaculate.Size = new System.Drawing.Size(314, 51);
            this.btnCaculate.TabIndex = 7;
            this.btnCaculate.Text = "Caculate Number of Students";
            this.btnCaculate.UseVisualStyleBackColor = true;
            this.btnCaculate.Click += new System.EventHandler(this.btnCaculate_Click);
            // 
            // txtNumber
            // 
            this.txtNumber.Font = new System.Drawing.Font("Comic Sans MS", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtNumber.Location = new System.Drawing.Point(360, 156);
            this.txtNumber.Name = "txtNumber";
            this.txtNumber.ReadOnly = true;
            this.txtNumber.Size = new System.Drawing.Size(259, 31);
            this.txtNumber.TabIndex = 5;
            // 
            // txtClassID
            // 
            this.txtClassID.Font = new System.Drawing.Font("Comic Sans MS", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.txtClassID.Location = new System.Drawing.Point(360, 86);
            this.txtClassID.Name = "txtClassID";
            this.txtClassID.Size = new System.Drawing.Size(259, 31);
            this.txtClassID.TabIndex = 6;
            // 
            // lbNoS
            // 
            this.lbNoS.AutoSize = true;
            this.lbNoS.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lbNoS.Location = new System.Drawing.Point(137, 159);
            this.lbNoS.Name = "lbNoS";
            this.lbNoS.Size = new System.Drawing.Size(202, 28);
            this.lbNoS.TabIndex = 3;
            this.lbNoS.Text = "Number of Students";
            // 
            // lbClassID
            // 
            this.lbClassID.AutoSize = true;
            this.lbClassID.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lbClassID.Location = new System.Drawing.Point(137, 89);
            this.lbClassID.Name = "lbClassID";
            this.lbClassID.Size = new System.Drawing.Size(141, 28);
            this.lbClassID.TabIndex = 4;
            this.lbClassID.Text = "Enter ClassID";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(756, 368);
            this.Controls.Add(this.btnCaculate);
            this.Controls.Add(this.txtNumber);
            this.Controls.Add(this.txtClassID);
            this.Controls.Add(this.lbNoS);
            this.Controls.Add(this.lbClassID);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button btnCaculate;
        private TextBox txtNumber;
        private TextBox txtClassID;
        private Label lbNoS;
        private Label lbClassID;
    }
}