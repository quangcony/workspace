using System;
using System.Collections.Generic;
using System.Linq;

namespace example_linq
{
    public class Product
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string[] Colors { get; set; }
        public int Brand { get; set; }

        public Product(int iD, string name, double price, string[] colors, int brand)
        {
            ID = iD;
            Name = name;
            Price = price;
            Colors = colors;
            Brand = brand;
        }

        override public string ToString()
            => $"{ID,3} {Name,12} {Price,5} {Brand,2} {string.Join(",", Colors)}";

    }

    public class Products
    {
        public static List<Product> products;

        static Products()
        {
            products = new List<Product>()
            {
                new Product(1, "Ban hoc",    200, new string[] {"Trang", "Xanh"},       1),
                new Product(2, "Tui da",     300, new string[] {"Do", "Den", "Vang"},   2),
                new Product(3, "Ban tra",    400, new string[] {"Xam", "Xanh"},         2),
                new Product(4, "Tranh treo", 400, new string[] {"Vang", "Xanh"},        1),
                new Product(5, "Den trum",   500, new string[] {"Trang"},               3),
                new Product(6, "Giuong ngu", 500, new string[] {"Trang"},               2),
                new Product(7, "Tu ao",      600, new string[] {"Trang"},               3),
            };
        }
    }

    public class Brand
    {
        public string Name { get; set; }
        public int ID { get; set; }

        static List<Brand> _brands;
        public static List<Brand> brands
        {
            get
            {
                if (_brands == null)
                {
                    _brands = new List<Brand>() {
                        new Brand{ID = 1, Name = "Cong ty FPT"},
                        new Brand{ID = 2, Name = "Cong ty Phi Long"},
                        new Brand{ID = 4, Name = "Cong ty VKU"},
                    };
                }
                return _brands;
            }
        }
    }

    internal class Program
    {
        static void Main(string[] args)
        {
            var products = Products.products;
            var brands = Brand.brands;

            //lay ra cac san pham co gia 400
            var product400 = from product in products
                             where product.Price == 400
                             select product;
            Console.WriteLine("San pham co gia bang 400");
            foreach (var product in product400)
                Console.WriteLine(product.ToString());
            Console.WriteLine();

            //loc du lieu bang where
            var result1 = from product in products
                          where product.Price >= 300
                          where product.Name.StartsWith("Ban")
                          select product;
            Console.WriteLine("San pham co ten bat dau la 'Bàn', gia tren 300");
            foreach (var product in result1)
                Console.WriteLine(product.ToString());
            Console.WriteLine();

            //sap xep bang orderby
            var result2 = from product in products
                          where product.Price <= 300
                          orderby product.Price descending
                          select product;
            Console.WriteLine("San pham nho hon bang 300, sap xep theo gia giam dan");
            foreach (var product in result2) 
                Console.WriteLine($"{product.Name} - {product.Price}");
            Console.WriteLine();

            // Nhom ket qua bang group
            var ketqua5 = from product in products
                          where product.Price >= 400 && product.Price <= 500
                          group product by product.Price;

            Console.WriteLine("Cac san pham nhom theo gia 400, 500");
            foreach (var group in ketqua5)
            {
                Console.WriteLine(group.Key);
                foreach (var product in group)
                {
                    Console.WriteLine($"    {product.Name} - {product.Price}");
                }
            }
            Console.WriteLine();

            // inner join
            var ketqua7 = from product in products
                          join brand in brands on product.Brand equals brand.ID
                          select new
                          {
                              name = product.Name,
                              brand = brand.Name,
                              price = product.Price
                          };

            Console.WriteLine("San pham - Gia - Ten Hang");
            foreach (var item in ketqua7)
            {
                Console.WriteLine($"{item.name,10} {item.price,4} {item.brand,12}");
            }
            Console.WriteLine();

            // left join
            var ketqua8 = from product in products
                          join brand in brands on product.Brand equals brand.ID into t
                          from brand in t.DefaultIfEmpty()
                          select new
                          {
                              name = product.Name,
                              brand = (brand == null) ? "NO-BRAND" : brand.Name,
                              price = product.Price
                          };
            Console.WriteLine("San pham - Gia - Ten Hang");
            foreach (var item in ketqua8)
            {
                Console.WriteLine($"{item.name,10} {item.price,4} {item.brand,12}");
            }


        }
    }
}
