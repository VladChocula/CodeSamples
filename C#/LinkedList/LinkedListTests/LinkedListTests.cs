using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using LinkedLists;

namespace LinkedListTests
{
    [TestClass]
    public class LinkedListTests
    {
        public int PopulateList(ref List<int> testList)
        {
            Random rnd = new Random();
            int headValue = rnd.Next(0, 101);
            int numOfListEntries = rnd.Next(9, 25);

            //Populate the list with a number of Nodes, value between 0 - 100
            //Can test to see > 100 or sub-zero values during the tests themselves.
            for(int i = 0; i < numOfListEntries; i++)
            {
                int nodeValue = rnd.Next(0, 101);
                testList.Add(new Node<int>(nodeValue));
            }

            return numOfListEntries;
        }

        [TestMethod]
        public void AddTests()
        {
            Random rnd = new Random();
            var testList = new BugHuntTest.List<int>();
            var numOfEntries = PopulateList(ref testList);

            Assert.AreEqual(testList.Length, numOfEntries);

            var newValue = rnd.Next(0, 101);
            var newNode = new BugHuntTest.Node<int>(newValue);
            testList.Add(newNode);

            Assert.AreEqual(testList.Length, ++numOfEntries);
            Assert.AreEqual(testList.Tail, newNode);
        }

        [TestMethod]
        public void AddFromHeadTests()
        {
            Random rnd = new Random();
            var testList = new BugHuntTest.List<int>();
            var numOfEntries = PopulateList(ref testList);

            Assert.AreEqual(testList.Length, numOfEntries);

            var newValue = rnd.Next(0, 101);
            var newHead = new BugHuntTest.Node<int>(newValue);
            testList.AddFromHead(newHead);

            Assert.AreEqual(testList.Length, ++numOfEntries);
            Assert.AreEqual(testList.Head, newHead);
        }

        [TestMethod]
        public void InsertTests()
        {
            Random rnd = new Random();
            var testList = new BugHuntTest.List<int>();
            var numOfEntries = PopulateList(ref testList);

            Assert.AreEqual(testList.Length, numOfEntries);
            
            //Testing to see if we can Insert in the middle of the List body
            var newValue = rnd.Next(101, 200);
            var newNode = new BugHuntTest.Node<int>(newValue);
            int insertPosition = rnd.Next(1, numOfEntries -1);
            testList.Insert(insertPosition, newNode);

            Assert.AreEqual(testList.Length, ++numOfEntries);
            Assert.AreEqual(newNode, testList.FindByData(newValue));

            //Testing Insert from the Head of the list
            var headCache = testList.Head;
            var newHead = new BugHuntTest.Node<int>(rnd.Next(201, 299));
            testList.Insert(0, newHead);

            Assert.AreEqual(testList.Length, ++numOfEntries);
            Assert.AreEqual(testList.Head, newHead);
            Assert.AreEqual(headCache.Data, testList.Head.Next.Data);
            Assert.AreEqual(testList.Head, testList.FindByData(newHead.Data));

            //Testing Insert from the Tail of the list
            var tailCache = testList.Tail;
            var newTail = new BugHuntTest.Node<int>(rnd.Next(301, 399));
            testList.Insert(testList.Length - 1, newTail);

            Assert.AreEqual(testList.Length, ++numOfEntries);
            Assert.AreEqual(testList.Tail, newTail);
            Assert.AreEqual(testList.Tail, testList.FindByData(newTail.Data));
        }

        [TestMethod]
        public void PopTest()
        {
            Random rnd = new Random();
            var testList = new BugHuntTest.List<int>();
            var numOfEntries = PopulateList(ref testList);

            Assert.AreEqual(testList.Length, numOfEntries);

            var tailCache = testList.Tail;
            var poppedNode = testList.Pop();

            Assert.AreEqual(testList.Length, --numOfEntries);
            Assert.AreEqual(tailCache, poppedNode);
            Assert.AreNotEqual(testList.Tail, tailCache);

            for (int i = 0; i < numOfEntries; i++)
            {
                testList.Pop();
            }

            Assert.AreEqual(testList.Length, 0);
            Assert.AreEqual(testList.Head, null);
            Assert.AreEqual(testList.Tail, null);
        }

        [TestMethod]
        public void DeleteByPositionTest()
        {
            Random rnd = new Random();
            var testList = new BugHuntTest.List<int>();
            var numOfEntries = PopulateList(ref testList);

            Assert.AreEqual(testList.Length, numOfEntries);

            // DeleteByPosition on any element besides the Head & Tail
            int deletePosition = rnd.Next(1, numOfEntries - 1);
            var node1 = testList.FindByPosition(deletePosition - 1);
            var node2 = testList.FindByPosition(deletePosition + 1);

            testList.DeleteByPosition(deletePosition);

            Assert.AreEqual(testList.Length, --numOfEntries);
            Assert.AreEqual(node1, testList.FindByPosition(deletePosition - 1));
            Assert.AreEqual(node2, testList.FindByPosition(deletePosition));

            //Testing DeleteByPosition on the Head
            var headCache = testList.Head;
            var nextNode = testList.Head.Next;

            Assert.AreEqual(headCache, testList.Head);

            testList.DeleteByPosition(0);

            Assert.AreEqual(testList.Length, --numOfEntries);
            Assert.AreNotEqual(headCache, testList.Head);
            Assert.AreEqual(nextNode, testList.Head);

            //Testing DeleteByPosition on the Tail
            var nearTail = testList.FindByPosition(testList.Length - 2);
            var tailCache = testList.FindByPosition(testList.Length -1);

            
            Assert.AreEqual(testList.Tail, tailCache);
            Assert.AreEqual(testList.Tail, testList.FindByPosition(testList.Length));
            Assert.AreNotEqual(nearTail, testList.Tail);

            testList.DeleteByPosition(testList.Length - 1);

            Assert.AreEqual(testList.Length, --numOfEntries);
            Assert.AreEqual(nearTail, testList.Tail);
            Assert.AreNotEqual(tailCache, testList.Tail);
        }   
    }
}