/***
Linked Lists by Steven Oliveira
Created a Linked List implementation in C#, as well as a set of Unit Tests for the Linked List.
***/

using System;

namespace LinkedList
{
    public class Node<T>
    {
        public T Data { get; set; }
        public Node<T>? Next { get; set; }
        public Node(T data) { Data = data; }
    }

    public class List<T>
    {
        public Node<T>? Head { get; private set; }
        public Node<T>? Tail { get; private set; }

        private int ListNodeSize = 0;

        /* Generic Constructor */
        public List()
        {
            Head = null;
            Tail = null;
        }

        /*Template-based List Constructor */
        public List(Node<T> node)
        {
             Head = node;
             Tail = node;
             ListNodeSize++;
        }

        /* Returns list length */
        public int Length { get { return ListNodeSize; } }

        /* Adds an element to the list from the Tail */
        public void Add(Node<T> newNode)
        {
            /* Covering the case where the list is initialized but completely empty */
            if (Head == null && Tail == null)
            {
                Head = newNode;
                Tail = newNode;
            }

            Tail.Next = newNode;
            Tail = newNode;
            ListNodeSize++;
        }

        public void AddFromHead(Node<T> newFirstElement)
        {
            //List has been initialized but is empty
            if (Head == null && Tail == null)
            {
                Head = newFirstElement;
                Tail = newFirstElement;
                ListNodeSize++;
                return;
            }

            newFirstElement.Next = Head;
            Head = newFirstElement;
            ListNodeSize++;
        }

        /* Deletes the nth element in the list */
        public void DeleteByPosition(int elementPosition)
        {
            //Returning if we try to delete an element position that is beyond the list's element range
            if (elementPosition >= ListNodeSize || elementPosition < 0)
                return;
            
            //If the Tail is the indicated position, call Pop()
            else if (elementPosition + 1 == ListNodeSize)
            {
                Pop();
                return;
            }

            //If the Head is the indicated position...
            else if (elementPosition == 0)
            {
                var deleteElement = Head;
                Head = Head.Next;
                deleteElement = null;
                ListNodeSize--;
                return;
            }

            int i = 1;
            Node<T>? current = Head.Next;
            Node<T>? previous = Head;

            while(i != elementPosition)
            {
                previous = current;
                current = current.Next;
                i++;
            }

            previous.Next = current.Next;
            current = null;
            ListNodeSize--;
        }

        /* Returns and deletes the last element in the list */
        public Node<T>? Pop()
        {
            Node<T>? current = Head;

            //List is currently empty. Returning.
            if (ListNodeSize == 0)
            {
                return null;
            }

            //Only 1 element, which is the Tail and the Head. Setting both to null.
            else if (ListNodeSize == 1)
            {
                current = Tail;
                Head = null;
                Tail = Head;
                ListNodeSize--;
                return current;
            }

            while(current.Next != Tail)
            {
                current = current.Next;
            }

            Tail = current;
            current = Tail.Next;
            Tail.Next = null;
            ListNodeSize--;
            return current;
        }

        /* Inserts to the right of the element index at the element position */
        public void Insert(int elementPosition, Node<T> newNode)
        {
            //Returning if the Insert is attempted beyond the List Range
            if (elementPosition >= ListNodeSize || elementPosition < 0) 
                return;

            else if (elementPosition + 1 == ListNodeSize)
            {
                Add(newNode);
                return;
            }

            else if (elementPosition == 0)
            {
                AddFromHead(newNode);
                return;
            }

            Node<T>? current = Head;
            int i = 0;

            while (i != elementPosition)
            {
                current = current.Next;
                i++;
            }

            newNode.Next = current.Next;
            current.Next = newNode;
            ListNodeSize++;
        }

        /* Locate the node for given data */
        public Node<T> FindByData(object searchData)
        {
            if (searchData.Equals(Head.Data))
                return Head;

            Node<T> current = Head;

            while (current.Next != null)
            {
                current = current.Next;
                if (searchData.Equals(current.Data))
                    return current;
            }

            return null;
        }

        public Node<T>? FindByPosition(int elementPosition)
        {
            //Passed in element position is beyond the range of the LinkedList
            if (elementPosition > ListNodeSize || elementPosition < 0)
                return null;
            else if (elementPosition == ListNodeSize)
                return Tail;
            
            else if (elementPosition == 0)
                return Head;

            Node<T> current = Head;
            int i = 0;
            while ( i != elementPosition)
            {
                current = current.Next;
                i++;
            }

            return current;
        }
        
    }
}