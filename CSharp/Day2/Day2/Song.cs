using System;
using System.Collections.Generic;

namespace Day2
{
    internal class Song
    {
        public Song() { }
        public string TypeList {get;set;}
        public string Name {get; set;}
        public string Time {get; set;}

        public void DisplaySong()
        {
            Console.Write("Nhap so luong bai hat: ");
            int numSongs = int.Parse(Console.ReadLine());

            List<Song> songs = new List<Song>();

            Console.WriteLine("Nhap bai hat theo dinh dang: {typeList}_{name}_{time}");
            for (int i = 0; i < numSongs; i++)
            {
                Console.Write($"Bai hat {i}: ");
                string[] data = Console.ReadLine().Split('_');

                string type = data[0];
                string name = data[1];
                string time = data[2];

                Song song = new Song();
                song.TypeList = type;
                song.Name = name;
                song.Time = time;

                songs.Add(song);
            }

            Console.Write("Tim kiem theo the loai: ");
            string typeList = Console.ReadLine();

            Console.WriteLine("------------------------------------");
            Console.WriteLine($"Danh sach bai hat cho '{typeList}':");
            if(typeList == "all")
            {
                foreach (Song song in songs)
                {
                    Console.WriteLine("* " + song.Name);
                }
            }else
            {
                foreach(Song song in songs)
                {
                    if(song.TypeList == typeList)
                    {
                        Console.WriteLine("* " + song.Name);
                    }
                }
            }

        }

        static void Main()
        {
            Song song = new Song();
            song.DisplaySong();
        }


    }
}
