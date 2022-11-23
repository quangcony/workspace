using Day4;
using System;
using System.Collections;
using System.Collections.Generic;

namespace Day4
{
    class People
    {
        private string sID;
        private string name;
        public string SID { get => sID; set => sID = value; }
        public string Name { get => name; set => name = value; }
        public People() { }

        public People(string sID, string name)
        {
            SID = sID;
            Name = name;
        }

        public void Show()
        {
            Console.WriteLine("\t-Id: {0}", SID);
            Console.WriteLine("\t-Ten: {0}", Name);
        }

        public void NhapDS()
        {
            Console.Write("Nhap id: ");
            SID = Console.ReadLine();
            Console.Write("Nhap ten: ");
            Name = Console.ReadLine();
        }

        public void XuatDS()
        {
            this.Show();
        }

    }
    class Student3 : People
    {
        public string Faculty { get; set; }
        public float Mark { get; set; }

        public Student3() { }
        public Student3(string sID, string name, string faculty, float mark):base(sID, name)
        {
            Faculty = faculty;
            Mark = mark;
        }

        public new void Show()
        {
            base.Show();
            Console.WriteLine("\t-Khoa: {0}", Faculty);
            Console.WriteLine("\t-Diem tb: {0}", Mark);
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

        public new void NhapDS()
        {
            base.NhapDS();
            Console.Write("Nhap khoa sv: ");
            Faculty = Console.ReadLine();
            Console.Write("Nhap Diem tb: ");
            Mark = float.Parse(Console.ReadLine());
        }

        public new void XuatDS()
        {
            base.XuatDS();
            this.Show();
            
        }

        public void ShowMenu()
        {
            Console.WriteLine("------Chuong trinh quan ly sinh vien-------");
            Console.WriteLine("1. Nhap 1 SV");
            Console.WriteLine("2. Nhap danh sach SV");
            Console.WriteLine("3. Xuat Danh Sach SV");
            Console.WriteLine("0. Thoat");
        }

       
    }
    class Tester3
    {
        static void Main()
        {
            Student3 stu;
            List<Student3> studentList = new List<Student3>();
            ArrayList dssv = new ArrayList();
            bool exit = false;
            stu = new Student3();
            stu.ShowMenu();
            while (true)
            {
                Console.Write("Moi chon chuc nang: ");
                int ch = int.Parse(Console.ReadLine());
                switch (ch)
                {
                    case 1:
                        Console.WriteLine("------Nhap 1 sinh vien-------");
                        stu.Nhap1SV();
                        studentList.Add(stu);
                        break;
                    case 2:
                        Console.Write("Nhap so sv: ");
                        int n = int.Parse(Console.ReadLine());
                        Console.WriteLine("------Nhap danh sach sinh vien-------");
                        for (int i = 0; i < n; i++)
                        {
                            Student3 sv = new Student3();
                            Console.WriteLine("sinh vien {0}", (i + 1));
                            sv.NhapDS();
                            studentList.Add(sv);
                            dssv.Add(sv);
                        }
                        break;
                    case 3:
                        Console.WriteLine("------Thong tin sinh vien-------");
                        for (int i = 0; i < studentList.Count; i++)
                        {
                            Console.WriteLine("+ Sinh vien {0}", (i + 1));
                            studentList[i].Show();
                        }
                        break;
                    case 0:
                        Console.WriteLine("Thoat chuong trinh");
                        exit = true;
                        break;
                    default:
                        break;
                }
                if (exit)
                {
                    break;
                }
                stu.ShowMenu();
            }
        }
    }

}
