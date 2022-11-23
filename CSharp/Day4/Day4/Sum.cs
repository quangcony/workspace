using System;
using System.Collections.Generic;

namespace Day4
{
    internal class Sum
    {
        static void Main()
        {
            List<int> numbers = new List<int>();
            numbers.Add(8);
            numbers.Add(2);
            numbers.Add(2);
            numbers.Add(4);
            numbers.Add(8);
            numbers.Add(16);


            for (int i = 0; i < numbers.Count - 1; i++)
            {
                if (numbers[i] == numbers[i + 1])
                {
                    numbers[i] += numbers[i + 1];
                    numbers.RemoveAt(i + 1);
                    Console.WriteLine(i);
                    i = -1;
                    Console.WriteLine(i);

                }

            }

            Console.WriteLine(String.Join(" ", numbers));
            Console.WriteLine("Bnnna".CompareTo("Aa"));
        }
    }
}
