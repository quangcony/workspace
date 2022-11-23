namespace ConnnectToSqlServer
{
    partial class Form3
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
            this.lsbClass = new System.Windows.Forms.ListBox();
            this.lsvStudent = new System.Windows.Forms.ListView();
            this.columnHeader1 = new System.Windows.Forms.ColumnHeader();
            this.columnHeader2 = new System.Windows.Forms.ColumnHeader();
            this.columnHeader3 = new System.Windows.Forms.ColumnHeader();
            this.lbClasses = new System.Windows.Forms.Label();
            this.lbStudents = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // lsbClass
            // 
            this.lsbClass.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lsbClass.FormattingEnabled = true;
            this.lsbClass.ItemHeight = 20;
            this.lsbClass.Location = new System.Drawing.Point(12, 71);
            this.lsbClass.Name = "lsbClass";
            this.lsbClass.Size = new System.Drawing.Size(283, 224);
            this.lsbClass.TabIndex = 0;
            this.lsbClass.SelectedIndexChanged += new System.EventHandler(this.lsbClass_SelectedIndexChanged);
            // 
            // lsvStudent
            // 
            this.lsvStudent.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1,
            this.columnHeader2,
            this.columnHeader3});
            this.lsvStudent.Font = new System.Drawing.Font("Comic Sans MS", 9F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lsvStudent.GridLines = true;
            this.lsvStudent.Location = new System.Drawing.Point(318, 71);
            this.lsvStudent.Name = "lsvStudent";
            this.lsvStudent.Size = new System.Drawing.Size(405, 227);
            this.lsvStudent.TabIndex = 1;
            this.lsvStudent.UseCompatibleStateImageBehavior = false;
            this.lsvStudent.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "Student ID";
            this.columnHeader1.Width = 100;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "Name";
            this.columnHeader2.Width = 200;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "Class ID";
            this.columnHeader3.Width = 100;
            // 
            // lbClasses
            // 
            this.lbClasses.AutoSize = true;
            this.lbClasses.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lbClasses.Location = new System.Drawing.Point(80, 30);
            this.lbClasses.Name = "lbClasses";
            this.lbClasses.Size = new System.Drawing.Size(157, 29);
            this.lbClasses.TabIndex = 2;
            this.lbClasses.Text = "List of Classes";
            // 
            // lbStudents
            // 
            this.lbStudents.AutoSize = true;
            this.lbStudents.Font = new System.Drawing.Font("Comic Sans MS", 12F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.lbStudents.Location = new System.Drawing.Point(479, 30);
            this.lbStudents.Name = "lbStudents";
            this.lbStudents.Size = new System.Drawing.Size(173, 29);
            this.lbStudents.TabIndex = 2;
            this.lbStudents.Text = "List of Students";
            // 
            // Form3
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(737, 337);
            this.Controls.Add(this.lbStudents);
            this.Controls.Add(this.lbClasses);
            this.Controls.Add(this.lsvStudent);
            this.Controls.Add(this.lsbClass);
            this.Name = "Form3";
            this.Text = "Form3";
            this.Load += new System.EventHandler(this.Form3_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private ListBox lsbClass;
        private ListView lsvStudent;
        private Label lbClasses;
        private Label lbStudents;
        private ColumnHeader columnHeader1;
        private ColumnHeader columnHeader2;
        private ColumnHeader columnHeader3;
    }
}