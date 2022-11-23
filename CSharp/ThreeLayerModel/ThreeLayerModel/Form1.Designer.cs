namespace ThreeLayerModel
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
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
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.btnViewStudent = new System.Windows.Forms.Button();
            this.lvStudent = new System.Windows.Forms.ListView();
            this.SuspendLayout();
            // 
            // btnViewStudent
            // 
            this.btnViewStudent.Font = new System.Drawing.Font("Comic Sans MS", 10.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnViewStudent.Location = new System.Drawing.Point(158, 47);
            this.btnViewStudent.Name = "btnViewStudent";
            this.btnViewStudent.Size = new System.Drawing.Size(297, 54);
            this.btnViewStudent.TabIndex = 0;
            this.btnViewStudent.Text = "View Student Table";
            this.btnViewStudent.UseVisualStyleBackColor = true;
            // 
            // lvStudent
            // 
            this.lvStudent.Location = new System.Drawing.Point(33, 132);
            this.lvStudent.Name = "lvStudent";
            this.lvStudent.Size = new System.Drawing.Size(541, 341);
            this.lvStudent.TabIndex = 1;
            this.lvStudent.UseCompatibleStateImageBehavior = false;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(610, 497);
            this.Controls.Add(this.lvStudent);
            this.Controls.Add(this.btnViewStudent);
            this.Name = "Form1";
            this.Text = "Form1";
            this.ResumeLayout(false);

        }

        #endregion

        private Button btnViewStudent;
        private ListView lvStudent;
    }
}