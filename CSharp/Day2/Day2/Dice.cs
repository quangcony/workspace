using System;

namespace Day2
{
    internal class Dice
    {
        private int sides;

        public int Sides
        {
            get { return sides; }
            set { sides = value; }
        }
        public int Roll()
        {
            
            Random rdm = new Random();
            int randNumber = rdm.Next(1, sides + 1);

            return randNumber;

        }
        static void Main(string[] args)
        {

            Dice dice = new Dice();
            Console.Write("Enter value slides: ");
            dice.Sides = Convert.ToInt32(Console.ReadLine());
            Console.WriteLine("Random number: " + dice.Roll());
        }
    }
}
