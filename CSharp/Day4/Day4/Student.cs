using System;
using System.Collections.Generic;

namespace Day4
{
    class Student
    {
        private int sID;
        private string sName;
        private string sFaculty;
        private float sMark;

        public Student() { }

        public Student(Student stu)
        {
            sID = stu.sID;
            sName = stu.sName;
            sFaculty = stu.sFaculty;
            sMark = stu.sMark;
        }
        public Student(int id, string name, string faculty, float mark)
        {
            sID = id;
            sName = name;
            sFaculty = faculty;
            sMark = mark;
        }

        public int SID { get { return sID; } set { sID = value; } }
        public string Name { get { return sName; } set { sName = value; } }
        public string Faculty { get { return sFaculty; } set { sFaculty = value; } }
        public float Mark { get { return sMark; } set { sMark = value; } }
        public void Show()
        {
            Console.WriteLine("Ma sv: {0}", this.sID);
            Console.WriteLine("Ten sv: {0}", this.sName);
            Console.WriteLine("Khoa: {0}",this.sFaculty);
            Console.WriteLine("Diem tb: {0}", this.sMark);
        }
    }

    class Tester
    {
        public static void Main()
        {
            Student[] dssv;
            Console.Write("Nhap so luong sinh vien: ");
            int n = Convert.ToInt32(Console.ReadLine());

            dssv = new Student[n];
            Console.WriteLine("--------Nhap danh sach sinh vien:---------");
            for (int i = 0; i < n; i++)
            {
                Console.WriteLine("sinh vien {0}", (i + 1));
                dssv[i] = new Student();

                dssv[i].SID = i+1;

                Console.Write("Nhap ten sv: ");
                dssv[i].Name = Console.ReadLine();
                Console.Write("Nhap khoa sv: ");
                dssv[i].Faculty = Console.ReadLine();
                Console.Write("Nhap Diem tb: ");
                dssv[i].Mark = float.Parse(Console.ReadLine());
            }

            Console.WriteLine("------Danh sach sinh vien------");
            foreach(Student sv in dssv)
            {
                sv.Show();
            }
        }
    }

}
