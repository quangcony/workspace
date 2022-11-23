using System;

namespace Day2
{
    internal class Student : Person
    {
        private float gpa;
        public float Gpa { get { return gpa; } set { gpa = value; } }
        public Student() { }

        public Student(float gpa)
        {
            Gpa = gpa;
        }

        public void DisplayStudent() { }


    }
}
