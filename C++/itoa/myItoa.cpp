/***
 * Created a highly efficient ITOA function in C++ without using any built-in language features.
 * IOStream is included for the test scenario output created in main().
*/
#include <iostream>

void reverse(char str[], int length)
{
    int start = 0;
    int end = length;
    char swapBuffer;

    while (start < end)
    {
        swapBuffer = str[end];
        str[end--] = str[start];
        str[start++] = swapBuffer;
    }
}

char* mitoa(int Value, int Base)
{
    static char convertedStr[100];
    int index = 0;
    unsigned int complement = Value;
    bool isNegative = false;

    if (Value < 0)
    {
        Value = -Value;
        complement = ~Value;
        complement += 1;
        isNegative = true;
    }

    else if (Value == 0)
        convertedStr[index++] = '0';

    if (isNegative && Base != 10)
    {
        while(complement != 0)
        {
            int remainder = complement % Base;
            convertedStr[index++] = (remainder > 9) ? (remainder - 10) + 'a' : remainder + '0';
            complement = complement/Base;
        }
    }

    else
    {
        while (Value != 0)
        {
            int remainder = Value % Base;
            convertedStr[index++] = (remainder > 9) ? (remainder - 10) + 'a' : remainder + '0';
            Value = Value/Base;
        }

        if (isNegative)
            convertedStr[index++] = '-';
    }

    convertedStr[index] = '\0';
    reverse(convertedStr, index - 1); //Passing in index - 1 leaves the null terminator in place during reversal
    return convertedStr;
}

int main() {
    char buffer [100];
    std::cout << "mitoa - Base:10 " << mitoa(1567, 10) << std::endl;
    itoa(1567, buffer, 10);
    std::cout << "itoa - Base:10 " << buffer << std::endl;

    std::cout << "mitoa - Base:10 " << mitoa(-1567, 10) << std::endl;
    itoa(-1567, buffer, 10);
    std::cout << "itoa - Base:10 " << buffer << std::endl;

    std::cout << "mitoa - Base:2 " << mitoa(1567, 2) << std::endl;
    itoa(1567, buffer, 2);
    std::cout << "itoa - Base:2 " << buffer << std:: endl;

    std::cout << "mitoa - Base:2 " << mitoa(-1567, 2) << std::endl;
    itoa(-1567, buffer, 2);
    std::cout << "itoa - Base:2 " << buffer << std:: endl;

    std::cout << "mitoa - Base:8 " << mitoa(1567, 8) << std::endl;
    itoa(1567, buffer, 8);
    std::cout << "itoa - Base:8 " << buffer << std::endl;

    std::cout << "mitoa - Base:8 " << mitoa(-1567, 8) << std::endl;
    itoa(-1567, buffer, 8);
    std::cout << "itoa - Base:8 " << buffer << std::endl;

    std::cout << "mitoa - Base:16 " << mitoa(1567, 16) << std::endl;
    itoa(1567, buffer, 16);
    std::cout << "itoa - Base:16 " << buffer << std::endl;

    std::cout << "mitoa - Base:2 " << mitoa(1234, 2) << std::endl;
    itoa(1234, buffer, 2);
    std::cout << "itoa - Base:2 " << buffer << std::endl;

    std::cout << "mitoa - Base:16 " << mitoa(-1234, 16) << std::endl;
    itoa(-1234, buffer, 16);
    std::cout << "itoa - Base:16 " << buffer << std::endl;
    
    return 0;
}