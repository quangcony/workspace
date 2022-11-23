namespace UsingSqlDataAdapter
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
            this.btnLoadTable = new System.Windows.Forms.Button();
            this.dtgStudent = new System.Windows.Forms.DataGridView();
            this.gbStudentInfo = new System.Windows.Forms.GroupBox();
            this.btnDelete = new System.Windows.Forms.Button();
            this.btnUpdate = new System.Windows.Forms.Button();
            this.btnInsert = new System.Windows.Forms.Button();
            this.lbClassID = new System.Windows.Forms.Label();
            this.txtClassID = new System.Windows.Forms.TextBox();
            this.lbName = new System.Windows.Forms.Label();
            this.txtName = new System.Windows.Forms.TextBox();
            this.lbStudentID = new System.Windows.Forms.Label();
            this.txtStudentID = new System.Windows.Forms.TextBox();
            ((System.ComponentModel.ISupportInitialize)(this.dtgStudent)).BeginInit();
            this.gbStudentInfo.SuspendLayout();
            this.SuspendLayout();
            // 
            // btnLoadTable
            // 
            this.btnLoadTable.Font = new System.Drawing.Font("Comic Sans MS", 10.8F, System.Drawing.FontStyle.Bold, System.Drawing.GraphicsUnit.Point);
            this.btnLoadTable.Location = new System.Drawing.Point(69, 25);
            this.btnLoadTable.Name = "btnLoadTable";
            this.btnLoadTable.Size = new System.Drawing.Size(275, 71);
            this.btnLoadTable.TabIndex = 0;
            this.btnLoadTable.Text = "Load table Student on DataGridView ";
            this.btnLoadTable.UseVisualStyleBackColor = true;
            this.btnLoadTable.Click += new System.EventHandler(this.btnLoadTable_Click);
            // 
            // dtgStudent
            // 
            this.dtgStudent.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dtgStudent.Location = new System.Drawing.Point(12, 116);
            this.dtgStudent.Name = "dtgStudent";
            this.dtgStudent.RowHeadersWidth = 51;
            this.dtgStudent.RowTemplate.Height = 29;
            this.dtgStudent.Size = new System.Drawing.Size(433, 322);
            this.dtgStudent.TabIndex = 1;
            this.dtgStudent.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dtgStudent_CellContentClick);
            // 
            // gbStudentInfo
            // 
            this.gbStudentInfo.Controls.Add(this.btnDelete);
            this.gbStudentInfo.Controls.Add(this.btnUpdate);
            this.gbStudentInfo.Controls.Add(this.btnInsert);
            this.gbStudentInfo.Controls.Add(this.lbClassID);
            this.gbStudentInfo.Controls.Add(this.txtClassID);
            this.gbStudentInfo.Controls.Add(this.lbName);
            this.gbStudentInfo.Controls.Add(this.txtName);
            this.gbStudentInfo.Controls.Add(this.lbStudentID);
            this.gbStudentInfo.Controls.Add(this.txtStudentID);
            this.gbStudentInfo.Font = new System.Drawing.Font("Comic Sans MS", 10.8F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point);
            this.gbStudentInfo.Location = new System.Drawing.Point(494, 116);
            this.gbStudentInfo.Name = "gbStudentInfo";
            this.gbStudentInfo.Size = new System.Drawing.Size(444, 322);
            this.gbStudentInfo.TabIndex = 2;
            this.gbStudentInfo.TabStop = false;
            this.gbStudentInfo.Text = "Student Infomation";
            // 
            // btnDelete
            // 
            this.btnDelete.Location = new System.Drawing.Point(315, 230);
            this.btnDelete.Name = "btnDelete";
            this.btnDelete.Size = new System.Drawing.Size(108, 43);
            this.btnDelete.TabIndex = 2;
            this.btnDelete.Text = "Delete";
            this.btnDelete.UseVisualStyleBackColor = true;
            this.btnDelete.Click += new System.EventHandler(this.btnDelete_Click);
            // 
            // btnUpdate
            // 
            this.btnUpdate.Location = new System.Drawing.Point(172, 230);
            this.btnUpdate.Name = "btnUpdate";
            this.btnUpdate.Size = new System.Drawing.Size(113, 43);
            this.btnUpdate.TabIndex = 2;
            this.btnUpdate.Text = "Update";
            this.btnUpdate.UseVisualStyleBackColor = true;
            this.btnUpdate.Click += new System.EventHandler(this.btnUpdate_Click);
            // 
            // btnInsert
            // 
            this.btnInsert.Location = new System.Drawing.Point(16, 230);
            this.btnInsert.Name = "btnInsert";
            this.btnInsert.Size = new System.Drawing.Size(114, 43);
            this.btnInsert.TabIndex = 2;
            this.btnInsert.Text = "Insert";
            this.btnInsert.UseVisualStyleBackColor = true;
            this.btnInsert.Click += new System.EventHandler(this.btnInsert_Click);
            // 
            // lbClassID
            // 
            this.lbClassID.AutoSize = true;
            this.lbClassID.Location = new System.Drawing.Point(16, 154);
            this.lbClassID.Name = "lbClassID";
            this.lbClassID.Size = new System.Drawing.Size(81, 24);
            this.lbClassID.TabIndex = 1;
            this.lbClassID.Text = "Class ID";
            // 
            // txtClassID
            // 
            this.txtClassID.Location = new System.Drawing.Point(160, 145);
            this.txtClassID.Name = "txtClassID";
            this.txtClassID.Size = new System.Drawing.Size(263, 33);
            this.txtClassID.TabIndex = 0;
            // 
            // lbName
            // 
            this.lbName.AutoSize = true;
            this.lbName.Location = new System.Drawing.Point(16, 102);
            this.lbName.Name = "lbName";
            this.lbName.Size = new System.Drawing.Size(129, 24);
            this.lbName.TabIndex = 1;
            this.lbName.Text = "Student Name";
            // 
            // txtName
            // 
            this.txtName.Location = new System.Drawing.Point(160, 93);
            this.txtName.Name = "txtName";
            this.txtName.Size = new System.Drawing.Size(263, 33);
            this.txtName.TabIndex = 0;
            // 
            // lbStudentID
            // 
            this.lbStudentID.AutoSize = true;
            this.lbStudentID.Location = new System.Drawing.Point(16, 48);
            this.lbStudentID.Name = "lbStudentID";
            this.lbStudentID.Size = new System.Drawing.Size(105, 24);
            this.lbStudentID.TabIndex = 1;
            this.lbStudentID.Text = "Student ID";
            // 
            // txtStudentID
            // 
            this.txtStudentID.Location = new System.Drawing.Point(160, 39);
            this.txtStudentID.Name = "txtStudentID";
            this.txtStudentID.Size = new System.Drawing.Size(263, 33);
            this.txtStudentID.TabIndex = 0;
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(966, 450);
            this.Controls.Add(this.gbStudentInfo);
            this.Controls.Add(this.dtgStudent);
            this.Controls.Add(this.btnLoadTable);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dtgStudent)).EndInit();
            this.gbStudentInfo.ResumeLayout(false);
            this.gbStudentInfo.PerformLayout();
            this.ResumeLayout(false);

        }

        #endregion

        private Button btnLoadTable;
        private DataGridView dtgStudent;
        private GroupBox gbStudentInfo;
        private Button btnDelete;
        private Button btnUpdate;
        private Button btnInsert;
        private Label lbClassID;
        private TextBox txtClassID;
        private Label lbName;
        private TextBox txtName;
        private Label lbStudentID;
        private TextBox txtStudentID;
    }
}