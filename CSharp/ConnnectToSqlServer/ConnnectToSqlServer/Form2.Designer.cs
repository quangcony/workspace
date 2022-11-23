namespace ConnnectToSqlServer
{
    partial class Form2
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
            System.Windows.Forms.ListViewItem listViewItem1 = new System.Windows.Forms.ListViewItem("");
            System.Windows.Forms.ListViewItem listViewItem2 = new System.Windows.Forms.ListViewItem(new string[] {
            "",
            ""}, -1);
            System.Windows.Forms.ListViewItem listViewItem3 = new System.Windows.Forms.ListViewItem(new string[] {
            "",
            ""}, -1);
            this.lbClassID = new System.Windows.Forms.Label();
            this.txtClassID = new System.Windows.Forms.TextBox();
            this.btnViewDetail = new System.Windows.Forms.Button();
            this.lbID = new System.Windows.Forms.Label();
            this.txtID = new System.Windows.Forms.TextBox();
            this.lbName = new System.Windows.Forms.Label();
            this.txtName = new System.Windows.Forms.TextBox();
            this.lbYear = new System.Windows.Forms.Label();
            this.txtYear = new System.Windows.Forms.TextBox();
            this.btnViewList = new System.Windows.Forms.Button();
            this.lsvStudents = new System.Windows.Forms.ListView();
            this.columnHeader1 = new System.Windows.Forms.ColumnHeader();
            this.columnHeader2 = new System.Windows.Forms.ColumnHeader();
            this.columnHeader3 = new System.Windows.Forms.ColumnHeader();
            this.SuspendLayout();
            // 
            // lbClassID
            // 
            this.lbClassID.AutoSize = true;
            this.lbClassID.Font = new System.Drawing.Font("Comic Sans MS", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lbClassID.Location = new System.Drawing.Point(29, 53);
            this.lbClassID.Name = "lbClassID";
            this.lbClassID.Size = new System.Drawing.Size(122, 24);
            this.lbClassID.TabIndex = 0;
            this.lbClassID.Text = "Enter ClassID";
            // 
            // txtClassID
            // 
            this.txtClassID.Location = new System.Drawing.Point(215, 50);
            this.txtClassID.Name = "txtClassID";
            this.txtClassID.Size = new System.Drawing.Size(249, 27);
            this.txtClassID.TabIndex = 1;
            // 
            // btnViewDetail
            // 
            this.btnViewDetail.Font = new System.Drawing.Font("Comic Sans MS", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnViewDetail.Location = new System.Drawing.Point(105, 102);
            this.btnViewDetail.Name = "btnViewDetail";
            this.btnViewDetail.Size = new System.Drawing.Size(278, 45);
            this.btnViewDetail.TabIndex = 2;
            this.btnViewDetail.Text = "View In Detail";
            this.btnViewDetail.UseVisualStyleBackColor = true;
            this.btnViewDetail.Click += new System.EventHandler(this.btnViewDetail_Click);
            // 
            // lbID
            // 
            this.lbID.AutoSize = true;
            this.lbID.Font = new System.Drawing.Font("Comic Sans MS", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lbID.Location = new System.Drawing.Point(29, 186);
            this.lbID.Name = "lbID";
            this.lbID.Size = new System.Drawing.Size(71, 24);
            this.lbID.TabIndex = 0;
            this.lbID.Text = "ClassID";
            // 
            // txtID
            // 
            this.txtID.Location = new System.Drawing.Point(215, 183);
            this.txtID.Name = "txtID";
            this.txtID.Size = new System.Drawing.Size(249, 27);
            this.txtID.TabIndex = 1;
            // 
            // lbName
            // 
            this.lbName.AutoSize = true;
            this.lbName.Font = new System.Drawing.Font("Comic Sans MS", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lbName.Location = new System.Drawing.Point(29, 231);
            this.lbName.Name = "lbName";
            this.lbName.Size = new System.Drawing.Size(101, 24);
            this.lbName.TabIndex = 0;
            this.lbName.Text = "Class Name";
            // 
            // txtName
            // 
            this.txtName.Location = new System.Drawing.Point(215, 228);
            this.txtName.Name = "txtName";
            this.txtName.Size = new System.Drawing.Size(249, 27);
            this.txtName.TabIndex = 1;
            // 
            // lbYear
            // 
            this.lbYear.AutoSize = true;
            this.lbYear.Font = new System.Drawing.Font("Comic Sans MS", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lbYear.Location = new System.Drawing.Point(29, 277);
            this.lbYear.Name = "lbYear";
            this.lbYear.Size = new System.Drawing.Size(48, 24);
            this.lbYear.TabIndex = 0;
            this.lbYear.Text = "Year";
            // 
            // txtYear
            // 
            this.txtYear.Location = new System.Drawing.Point(215, 274);
            this.txtYear.Name = "txtYear";
            this.txtYear.Size = new System.Drawing.Size(249, 27);
            this.txtYear.TabIndex = 1;
            // 
            // btnViewList
            // 
            this.btnViewList.Font = new System.Drawing.Font("Comic Sans MS", 10.2F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnViewList.Location = new System.Drawing.Point(560, 102);
            this.btnViewList.Name = "btnViewList";
            this.btnViewList.Size = new System.Drawing.Size(278, 45);
            this.btnViewList.TabIndex = 2;
            this.btnViewList.Text = "View List of Students";
            this.btnViewList.UseVisualStyleBackColor = true;
            this.btnViewList.Click += new System.EventHandler(this.btnViewList_Click);
            // 
            // lsvStudents
            // 
            this.lsvStudents.Columns.AddRange(new System.Windows.Forms.ColumnHeader[] {
            this.columnHeader1,
            this.columnHeader2,
            this.columnHeader3});
            this.lsvStudents.Font = new System.Drawing.Font("Comic Sans MS", 10.2F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.lsvStudents.FullRowSelect = true;
            this.lsvStudents.GridLines = true;
            this.lsvStudents.HideSelection = true;
            this.lsvStudents.Items.AddRange(new System.Windows.Forms.ListViewItem[] {
            listViewItem1,
            listViewItem2,
            listViewItem3});
            this.lsvStudents.Location = new System.Drawing.Point(515, 175);
            this.lsvStudents.Name = "lsvStudents";
            this.lsvStudents.Size = new System.Drawing.Size(371, 235);
            this.lsvStudents.TabIndex = 3;
            this.lsvStudents.UseCompatibleStateImageBehavior = false;
            this.lsvStudents.View = System.Windows.Forms.View.Details;
            // 
            // columnHeader1
            // 
            this.columnHeader1.Text = "StudentID";
            this.columnHeader1.Width = 100;
            // 
            // columnHeader2
            // 
            this.columnHeader2.Text = "Name";
            this.columnHeader2.Width = 170;
            // 
            // columnHeader3
            // 
            this.columnHeader3.Text = "ClassID";
            this.columnHeader3.Width = 90;
            // 
            // Form2
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(911, 450);
            this.Controls.Add(this.lsvStudents);
            this.Controls.Add(this.btnViewList);
            this.Controls.Add(this.btnViewDetail);
            this.Controls.Add(this.txtYear);
            this.Controls.Add(this.txtName);
            this.Controls.Add(this.txtID);
            this.Controls.Add(this.txtClassID);
            this.Controls.Add(this.lbYear);
            this.Controls.Add(this.lbName);
            this.Controls.Add(this.lbID);
            this.Controls.Add(this.lbClassID);
            this.Name = "Form2";
            this.Text = "Form2";
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Label lbClassID;
        private TextBox txtClassID;
        private Button btnViewDetail;
        private Label lbID;
        private TextBox txtID;
        private Label lbName;
        private TextBox txtName;
        private Label lbYear;
        private TextBox txtYear;
        private Button btnViewList;
        private ListView lsvStudents;
        private ColumnHeader columnHeader1;
        private ColumnHeader columnHeader2;
        private ColumnHeader columnHeader3;
    }
}