using System;
using System.Collections.Generic;

namespace Day4
{
    class Student2
    {
        public string SID { get; set; }
        public string Name { get; set; }
        public string Faculty { get; set; }
        public float Mark { get; set; }

        public Student2() { }
        public Student2(string sID, string name, string faculty, float mark)
        {
            SID = sID;
            Name = name;
            Faculty = faculty;
            Mark = mark;
        }

        public void Show()
        {
            Console.WriteLine("Ma sv: {0}", SID);
            Console.WriteLine("Ten sv: {0}", Name);
            Console.WriteLine("Khoa: {0}", Faculty);
            Console.WriteLine("Diem tb: {0}", Mark);
        }
        public void Nhap1SV()
        {
            Console.Write("Nhap msv: ");
            SID = Console.ReadLine();
            Console.Write("Nhap ten sv: ");
            Name = Console.ReadLine();
            Console.Write("Nhap khoa sv: ");
            Faculty = Console.ReadLine();
            Console.Write("Nhap diem tb: ");
            Mark = float.Parse(Console.ReadLine());

        }

        public void NhapDS()
        {
            Console.Write("Nhap msv: ");
            SID = Console.ReadLine();
            Console.Write("Nhap ten sv: ");
            Name = Console.ReadLine();
            Console.Write("Nhap khoa sv: ");
            Faculty = Console.ReadLine();
            Console.Write("Nhap Diem tb: ");
            Mark = float.Parse(Console.ReadLine());
        }

        public void XuatDS()
        {
            this.Show();
        }
    }

    class Tester2
    {
        public static void Main()
        {
            Student2[] dssv;
            Console.Write("Nhap so sv: ");
            int n = int.Parse(Console.ReadLine());

            dssv = new Student2[n];
            Console.WriteLine("-------Nhap danh sach sinh vien-------");
            for (int i = 0; i < n; i++)
            {
                dssv[i] = new Student2();
                Console.WriteLine("sinh vien {0}", (i + 1));
                dssv[i].NhapDS();

            }

            Console.WriteLine("------Danh sach sinh vien------");
            foreach (Student2 stu in dssv)
            {
                stu.XuatDS();
            }
        }
    }

}
