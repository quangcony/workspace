using System;

namespace Day1
{
    internal class Exercise1
    {
        static void Main(string[] args)
        {
            Console.WriteLine("CHUONG TRINH TINH TONG HIEU TICH THUONG 2 SO a VÀ b");
            Console.WriteLine("---------------------------------------------------\n");

            Console.Write("Nhap so a: ");
            int a = Convert.ToInt32(Console.ReadLine());

            Console.Write("Nhap so b: ");
            int b = Convert.ToInt32(Console.ReadLine());

            int plus = a + b;
            int minus = a - b;
            int multiply = a * b;
            Console.Write("\n");
            Console.WriteLine($"Tong {a} + {b} = {plus}");
            Console.WriteLine($"Hieu {a} - {b} = {minus}");
            Console.WriteLine($"Tich {a} * {b} = {multiply}");

            if (b != 0)
            {
                float divide = (float)a / b;
                Console.WriteLine($"Thuong {a} / {b} = {divide}");
            }
            else
            {
                Console.WriteLine("Khong the thuc hien phep chia a/b");
            }
        }
    }
}
