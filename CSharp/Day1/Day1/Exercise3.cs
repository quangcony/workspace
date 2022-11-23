using System;

namespace Day1
{
    internal class Exercise3
    {
        static void Main()
        {
            bool isPrime = true;

            Console.Write("Nhap n: ");
            int n = Convert.ToInt32(Console.ReadLine());

            while(n < 2)
            {
                Console.Write("Nhap lai n: ");
                n = Convert.ToInt32(Console.ReadLine());
            }

            for(int i = 2 ; i < n / 2; i++)
            {
                if(n % i == 0)
                {
                    isPrime = false;
                    break;
                }
            }

            if(isPrime)
            {
                Console.WriteLine($"{n} la so nguyen to");
            }else
            {
                Console.WriteLine($"{n} khong phai la so nguyen to");
            }

        }
    }
}
