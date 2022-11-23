using System;
using System.Collections.Generic;

namespace Day4
{
    public class VienKhoaHoc
    {
        private string hoTen;
        private string bangCap;
        private int namSinh;

        public VienKhoaHoc()
        {
            hoTen = "";
            bangCap = "";
            namSinh = 0;
        }
        public VienKhoaHoc(string hoTen, string bangCap, int namSinh)
        {
            this.hoTen = hoTen;
            this.bangCap = bangCap;
            this.namSinh = namSinh;
        }

        public void Nhap()
        {
            Console.Write("Nhap Ho ten: ");
            hoTen = Console.ReadLine();

            Console.Write("Nhap Bang Cap: ");
            bangCap = Console.ReadLine();

            Console.Write("Nhap Nam sinh: ");
            namSinh = Int32.Parse(Console.ReadLine());

        }

        public void Xuat()
        {
            Console.WriteLine("Ho ten: {0} ; Bang Cap: {1} ; Nam Sinh: {2} ", hoTen, bangCap, namSinh);
        }
    }

    public class KhoaHoc:VienKhoaHoc
    {
        string chucVu;
        int baiBao;
        double bacLuong, ngayCong;

        public KhoaHoc():base()
        {
            chucVu = "";
            baiBao = 0;
            bacLuong = 0;
            ngayCong = 0;

        }

        public KhoaHoc(string hoTen, string bangCap, int namSinh, string chucVu, int baiBao, double bacLuong, double ngayCong):base(hoTen, bangCap, namSinh)
        {

            this.chucVu = chucVu;
            this.baiBao = baiBao;
            this.bacLuong = bacLuong;
            this.ngayCong = ngayCong;
        }

        public new void Nhap()

        {
            base.Nhap();
            Console.Write("Nhap Chuc Vu: ");
            chucVu = Console.ReadLine();
            Console.Write("Nhap so Bai Bao da duoc cong bo: ");
            baiBao = Int32.Parse(Console.ReadLine());
            Console.Write("Nhap so Ngay Cong trong thang: ");
            ngayCong = Double.Parse(Console.ReadLine());
            Console.Write("Nhap Bac Luong : ");
            bacLuong = Double.Parse(Console.ReadLine());

        }

        public new void Xuat()

        {
            base.Xuat();
            Console.WriteLine("So Bai Bao da duoc cong bo: {0} , So ngay cong trong thang: {1} , Bac Luong: {2}", baiBao, ngayCong, bacLuong);

        }

        public double TongLuongKH()
        {
            double luong = ngayCong * bacLuong;
            return luong;
        }
    }

    public class QuanLy:VienKhoaHoc
    {
        string chucVu;
        double bacLuong, ngayCong;

        public QuanLy() : base()

        {

            chucVu = ""; bacLuong = 0; ngayCong = 0;

        }

        public QuanLy(string hoTen, string bangCap, int namSinh, string chucVu, double bacLuong, double ngayCong):base(hoTen, bangCap, namSinh)
        {
            this.chucVu = chucVu;
            this.bacLuong = bacLuong;
            this.ngayCong = ngayCong;
        }

        public new void Nhap()

        {

            base.Nhap();
            Console.Write("Nhap Chuc Vu: "); chucVu = Console.ReadLine();

            Console.Write("Nhap so ngay cong trong thang: "); ngayCong = Double.Parse(Console.ReadLine());

            Console.Write("Nhap Bac Luong: "); bacLuong = Double.Parse(Console.ReadLine());

        }

        public new void Xuat()

        {
            base.Xuat();
            Console.WriteLine("Chuc vu: {0} , So ngay cong trong thang: {1} , Bac Luong: {2}", chucVu, ngayCong, bacLuong);
        }

        public double TongLuongQL()

        {
            double luong = ngayCong * bacLuong;
            return luong;
        }
    }
    public class NhanVienPTN : VienKhoaHoc

    {

        double luongThang;
        public NhanVienPTN() : base()

        {
            luongThang = 0;
        }

        public NhanVienPTN(string hoTen, string bangCap, int namSinh, double luongThang) : base(hoTen, bangCap, namSinh)

        {
            this.luongThang = luongThang;
        }

        public new void Nhap()

        {
            base.Nhap();
            Console.Write("Nhap Luong Thang : "); luongThang = Double.Parse(Console.ReadLine());
        }

        public new void Xuat()

        {
            base.Xuat();
            Console.WriteLine("Luong Thang: {0}", luongThang);
        }

        public double TongLuongNVPTN()

        {
            return luongThang;
        }
    }

    class Program

    {
        static void Main(string[] args)

        {
            int n, p, r;
            Console.Write("Nhap so luong Nha Khoa Hoc: "); n = Int32.Parse(Console.ReadLine());
            Console.Write("Nhap so luong Nha Quan Ly: "); p = Int32.Parse(Console.ReadLine());
            Console.Write("Nhap so luong Nhan Vien PTN: "); r = Int32.Parse(Console.ReadLine());

            KhoaHoc[] dskh = new KhoaHoc[n];
            {
                Console.WriteLine("Nhap du lieu cho cac Nha Khoa Hoc");
                for (int i = 0; i < n; i++)
                {
                    dskh[i] = new KhoaHoc();
                    Console.WriteLine("Nha KH {0}", (i + 1));
                    dskh[i].Nhap();
                }

            }
            QuanLy[] dsql = new QuanLy[p];
            {
                Console.WriteLine("Nhap du lieu cho cac Nha Quan Ly");
                for (int i = 0; i < p; i++)
                {
                    dsql[i] = new QuanLy();
                    Console.WriteLine("Nha QL {0}", (i + 1));
                    dsql[i].Nhap();
                }

            }

            NhanVienPTN[] dsnv = new NhanVienPTN[r];
            {
                Console.WriteLine("Nhap du lieu cho cac Nhan Vien PTN");
                for (int i = 0; i < r; i++)
                {
                    dsnv[i] = new NhanVienPTN();
                    Console.WriteLine("Nhan Vien PTN {0}", (i + 1));
                    dsnv[i].Nhap();
                }

            }

            Console.WriteLine("Thong tin cac Nha Khoa Hoc");
            for (int i = 0; i < n; i++) {
                Console.WriteLine("Nha KH {0}", (i+1));
                dskh[i].Xuat();
            }
            Console.WriteLine("Thong tin cac Nha Quan Ly");
            for (int i = 0; i < p; i++)
            {
                Console.WriteLine("Nha QL {0}", (i + 1));
                dsql[i].Xuat();
            }
            Console.WriteLine("Thong tin cac Nhan Vien PTN");
            for (int i = 0; i < r; i++)
            {
                Console.WriteLine("Nhan Vien PTN {0}", (i + 1));
                dsnv[i].Xuat();
            }

            double m, q, s;

            m = 0; q = 0; s = 0;

            for (int i = 0; i < n; i++) m += dskh[i].TongLuongKH();
            for (int i = 0; i < p; i++) q += dsql[i].TongLuongQL();
            for (int i = 0; i < r; i++) s += dsnv[i].TongLuongNVPTN();

            Console.WriteLine("Tong luong cua cac Nha Khoa Hoc la: {0}", m);
            Console.WriteLine("Tong luong cua cac Nha Quan Ly la: {0}", q);
            Console.WriteLine("Tong luong cua cac Nhan Vien PTN la: {0}", s);


        }

    }
}
