using System;

namespace Day1
{
    internal class Exercise4
    {
        static void Main()
        {
            Random rand = new Random();
            int randomNumber = rand.Next(1, 100);
            Console.WriteLine("So trung thuong: ?");

            Console.Write("Nhap so du doan: ");
            int userNumber = Convert.ToInt32(Console.ReadLine());

            int n = 0;
            while (n < 6)
            {
                    if(userNumber < randomNumber)
                    {
                        Console.WriteLine($"So doan {userNumber} nho hon");
                        Console.Write($"Doan lai lan {n + 1}: ");
                        userNumber = Convert.ToInt32(Console.ReadLine());
                        n++;
                    }else if(userNumber > randomNumber)
                    {
                        Console.WriteLine($"So doan {userNumber} lon hon");
                        Console.Write($"Doan lai lan {n + 1}: ");
                        userNumber = Convert.ToInt32(Console.ReadLine());
                        n++;
                    }
                    else
                    {
                        Console.WriteLine("Chuc mung, ban da trung thuong!");
                        break;
                    }
            }

            if(n >= 6)
            {
                Console.WriteLine("Xin loi, ban da het luot doan!");
            }

        }
    }
}
