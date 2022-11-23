using System;

namespace Day2
{
    internal class Person
    {
        private int age;
        private string name;

        public int Age { get { return age; } set { age = value; } }
        public string Name { get { return name; } set { name = value; } }

        public void Input() { }
        public void DisplayPerson()
        {

        }
        public Person() { }
        public Person(int age, string name) {
            Age = age;
            Name = name;
        }

        public override string ToString()
        {
            return "";
        }


    }
}
