using System;

namespace Day1
{
    internal class Exercise2
    {
        static void Main()
        {
            float a, b, c;
            double d, x1, x2;

            Console.WriteLine("CHUONG TRINH TIM NGHIEM CUA PHUONG TRINH BAC 2");
            Console.WriteLine("---------------------------------------------------\n");

            Console.Write("Nhap a: ");
            a = Convert.ToInt32(Console.ReadLine());
            while(a == 0)
            {
                Console.Write("Nhap lai a: ");
                a = Convert.ToInt32(Console.ReadLine());
            }

            Console.Write("Nhap b: ");
            b = Convert.ToInt32(Console.ReadLine());
            Console.Write("Nhap c: ");
            c = Convert.ToInt32(Console.ReadLine());
            Console.Write("\n");

            d = b * b - 4 * a * c;
            if(d == 0)
            {
                x1 = x2 = -b / (2 * a);
                Console.WriteLine("Phuong trinh bac hai co 1 nghiem duy nhat: x1 = x2 =  " + x1);
            }else if (d > 0){
                x1 = (-b + Math.Sqrt(d)) / (2 * a);
                x2 = (-b - Math.Sqrt(d)) / (2 * a);
                Console.WriteLine($"Phuong trinh bac hai co 2 nghiem phan biet: x1 = {x1}, x2 = {x2}");
            }else
            {
                Console.WriteLine("Phuong trinh vo nghiem");
            }
        }
    }
    
}
