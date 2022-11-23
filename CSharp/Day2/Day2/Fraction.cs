using System;

namespace Day2
{
    internal class Fraction
    {
        public int Num1 { get; set; }
        public int Den1 { get; set; }

        public int Num2 { get; set; }
        public int Den2 { get; set; }
        public int gcd(int a, int b)
        {
            if (a == 0)
                return b;
            return gcd(b % a, a);
        }

        public string lowest(int den3, int num3)
        {
            int common_factor = gcd(num3, den3);

            num3 = num3 / common_factor;
            den3 = den3 / common_factor;
            if(den3 == 1)
            {
                return "" + num3;
            }

            return num3 + "/" + den3;
        }

        public void Input()
        {
            Console.WriteLine("Nhap so thu nhat: {numerator}/{denonimator}");
            string[] number1 = Console.ReadLine().Split('/');
            Num1 = Convert.ToInt32(number1[0]);
            Den1 = Convert.ToInt32(number1[1]);

            Console.WriteLine("Nhap so thu hai: {numerator}/{denonimator}");
            string[] number2 = Console.ReadLine().Split('/');
            Num2 = Convert.ToInt32(number2[0]);
            Den2 = Convert.ToInt32(number2[1]);
        }
        public void AddFraction(int num1, int den1, int num2, int den2)
        {
            int den3 = gcd(den1, den2);

            den3 = (den1 * den2) / den3;

            int num3 = (num1) * (den3 / den1) + (num2) * (den3 / den2);

            Console.WriteLine("Tong la: " + lowest(den3, num3));
        }

        public void SubFraction(int num1, int den1, int num2, int den2)
        {
            int den3 = gcd(den1, den2);

            den3 = (den1 * den2) / den3;

            int num3 = (num1) * (den3 / den1) - (num2) * (den3 / den2);

            Console.WriteLine("Hieu la: " + lowest(den3, num3));
        }

        public void MultipleFraction(int num1, int den1, int num2, int den2)
        {
            int num3 = num1 * num2;
            int den3 = den1 * den2;

            Console.WriteLine("Tich la: " + lowest(den3, num3));
        }
        public void DivideFraction(int num1, int den1, int num2, int den2)
        {
            int num3 = num1 * den2;
            int den3 = den1 * num2;

            Console.WriteLine("Thuong la: " + lowest(den3, num3));
        }

        static void Main()
        {

            Fraction frac = new Fraction();

            frac.Input();
            frac.AddFraction(frac.Num1, frac.Den1, frac.Num2, frac.Den2);
            frac.SubFraction(frac.Num1, frac.Den1, frac.Num2, frac.Den2);
            frac.MultipleFraction(frac.Num1, frac.Den1, frac.Num2, frac.Den2);
            frac.DivideFraction(frac.Num1, frac.Den1, frac.Num2, frac.Den2);
        }

    }
}
