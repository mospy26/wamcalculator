# WAM Calculator
Simple JS program to calculate your EIHWAM and WAM i.e. Weighted Average Mark for students studying at the University of Sydney, Australia.

### How to use it

Read the sample_results.txt for a sample results file. Its very similar to an `.ini` config file except there are no sections. Lines parsed by the program looks like:
```sh
# this means that COMP2222 is of 2 credit points (CP), and the mark obtained is 50
COMP2222 = 50,2

# the default CP is 6 as per USYD rules. Mark obtained for INFO1111 is 80 and has default CP value 6
INFO1111 = 80
```

To run the program, pass this results file as command line argument:
```sh
node calculate.js <file>
```
