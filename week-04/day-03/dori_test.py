import unittest
from dori_work import *

class TestApples(unittest.TestCase):
    def test_get_apple(self):
        my_object = Apples()
        my_object.get_apple()
        self.assertEqual(my_object.get_apple(), "apple")

class TestSum_stuff(unittest.TestCase):
    def test_sum_all(self):
        new_individual = Sum_stuff([6, 7])
        self.assertEqual(new_individual.sum_all(), 13)

    def test_sum_all_empty(self):
        new_individual = Sum_stuff([])
        self.assertEqual(new_individual.sum_all(), 0)

    def test_sum_all_one_element(self):
        new_individual = Sum_stuff([21])
        self.assertEqual(new_individual.sum_all(), 21)

    def test_sum_all_zero(self):
        new_individual = Sum_stuff([0])
        self.assertEqual(new_individual.sum_all(), 0)

class TestAnagram(unittest.TestCase):
    def test_anagrams(self):
        words = Anagram("dog", "god")
        self.assertEqual(words.anagrams(), True)

class TestLetterCounter(unittest.TestCase):
    def test_count_letters(self):
        word = LetterCounter("mom")
        self.assertEqual(word.count_letters(), {"m": 2, "o": 1})

class TestFibonacci(unittest.TestCase):
    def test_fibonacci(self):
        number = Fibonacci(5)
        self.assertEqual(number.fibonacci(5), 5)

class TestSharpie(unittest.TestCase):
    def test_use(self):
        sharp = Sharpie("blue", 8.1)
        self.assertEqual(sharp.use(), 84.5)

if __name__ == '__main__':
    unittest.main()
