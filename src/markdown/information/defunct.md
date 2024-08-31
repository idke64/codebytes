#### "DeFunct"

This section of the guidebook is strictly dedicated toward CodeBytes' own syntactic language. "DeFunct" comes from the emphasis on the capabilities of the language, especially toward functions. More on that later.

It is not a real programming language and it does not have a compiler, but it will frequently show up in Theoretical Assessment events and occasionally in others. As a result, it is imperative that you have an understanding of how DeFunct works for your own advantage.

#### The Banter

The general syntax for DeFunct can be confusing at first glance. However, some portions are similar to other languages. We'll be talking about changes frequently.

First, to understand the basics, you must know DeFunct's defining feature: **Dynamic Function Updates**.  
What does this mean? I'm glad you asked!

That means that all code written for a function is **not** permanently etched into a program during compilation. Code can be written, deleted, moved, or reset during runtime, alongside protected instances.

What does that mean in the long run? More flexibility in how to run your program and how functions behave... and more vulnerable states for your program.

Below is a snippet of valid code for DeFunct.

```rust
declare : string : finisher = "CodeBytes"
// Declares an explicit variable of type string with identifier "finisher".

declare message = "Hello from"
// Declares an dynamically typed variable with identifier "message" that complexes into a string datatype.

define funct() = {
 return (message + " " + finisher)
}
// Defines a function with a run command of "return" that concatenates the strings together.

output funct()
// The run command of "output" that prints out "Hello from CodeBytes" into the output.
```

Keep close attention to the wording of the comments. The first thing to note is the leniency regarding **datatypes.**

Variables must be declared by the "declare" keyword - this applies to both primitive and class-defined datatypes. The declaration statement may be explicit or dynamically typed, as demonstrated by the first two calls of the snippet. The first call involves an explicit declaration, meaning the type is defined. This means that the variable "finisher" must be a string. However, the second call is dynamically typed, and assumes the value of whatever is passed through the declaration statement. We call this a complexation, as the dynamically typed type is assigned a type. In this case, "name" complexes from dynamically typed to a string.

What about functions? In this example, they are not complicated yet. A function is defined by the "define" keyword. It uses curly braces as a means to contain its code. For this function, it returns another string. Did you notice that the function had no specified return type?

That's right! It can be dynamically typed as well. For strictly defined values, you can define a function as such:

```rust
define : string : funct() = {...}
```

Which will restrict the return statement much, much more!  
Also, to note, most functions and statements, etc. can be separated by curly braces and parentheses.

Finally, the "output" statement. It runs just as expected. But, an important note was brought up in the comment: run commands.

All statements in the program must have a run command activating it. The most basic command is "run", which can precede most calls. Other ones such as "output", "input", "return", and others count as run commands. In general, a command that precedes some function or variable is usually going to be a function call.

This, of course, is not always the case. Lets see the below example:

```rust
declare : integer : points = 0
// Explicit declaration of an integer.

run points = 5
// Complete update of "points" from 0 to 5.

points -= 6
// Implicit subtractive run function on "points", taking it from 5 to -1.
// This is the same as 'run points -= 6'

points++
// Implicit additive run function on "points", taking it from -1 to 0.
// This is the same as 'run points++'
```

Interesting, huh? In general, it is good practice to follow the run command convention, as that is how the entirety of the language functions at a basic level, but it is generally implied through certain function calls that a variable is being updated. For most primitive datatypes, there will be implicit functions to accompany you. However, for external classes or more complex datatypes, a run command may become required.

Alright, let's get to some more basics, and then the good stuff. First, we'll talk about the primitive datatypes. For this section, it is expected that you only have to read the code snippets. After the datatypes, we'll throw in some common functions, and a bit more magic before the dynamic parts. Also... YOUR VARIABLES CANNOT BE NAMED A PRIMITIVE DATATYPE!

```rust
declare : short : ex1 = 0S
// short datatype, the max and min values this datatype can hold are found by "short.MIN" and "short.MAX" Respectively, the values are:
// -32786, 32767.

declare : integer : ex2 = 0
// integer datatype, the max and min values this datatype can hold are found by "integer.MAX" and "integer.MIN" Respectively, the values are:
// -2147483648, 2147483647.

declare : long : ex3 = 0L
// long datatype, the max and min values this datatype can hold are found by "long.MAX" and "long.MIN" Respectively, the values are:
// -9223372036854775808, 9223372036854775807.
// Note: The long datatype functions similarly to the long long datatype in C++.

declare : decimal : ex4 = 0.0
// decimal datatype, the max and

declare : integer : ex2 = 0
// integer datatype, the max and min values this datatype can hold are found by "integer.MAX" and "integer.MIN" Respectively, the values are:
// -2147483648, 2147483647.

declare : long : ex3 = 0L
// long datatype, the max and min values this datatype can hold are found by "long.MAX" and "long.MIN" Respectively, the values are:
// -9223372036854775808, 9223372036854775807.
// Note: The long datatype functions similarly to the long long datatype in C++.   min values this datatype can hold are found by "decimal.MAX" and "decimal.MIN" Respectively, the values are:
// 2.2250738585072014e-308, 1.7976931348623158e+308, regardless of sign.


declare : string : exs = "hi there"
// string datatype. Functions very similar to other string types in other languages. In DeFunct, a character is a single-slot string.
// Individual characters can be accessed in strings by way of indices. For example, "exs[0]" returns "h".
// A range of values in a string can also be accessed by way of indices, using ranges. "exs[0,1]" returns "hi". Note that it is inclusive.
// Other noteable functions: "string.uppercase(#string)", "#string.indexOf(#string)", "#string.lastIndexOf(#string)", "string.len(#string)", "string.lowercase(#string)", "string.replace(#string, #string)" (where arg1 is the old string and arg2 is the new string).

declare : vector : exv1 = <0,1>
// vector datatype. Can be declared explicitly like done here, or can be done implicitly as shown here:
declare exv2<3,2,5>

declare : array : exa1 = [6]{1,2,3,4,5,6}
// fixed array datatype. This is the strictly explicit declaration, where the size is fixed at 6 and values given.
declare : array : exa2 = {1,2,3,4,5,6}
// loose array datatype. This is the lenient explicit declaration, where the size is not fixed at 6, but the values were given to start.
declare : array : exa3[4]{1,2,3,4}
// fixed array datatype. This is the strictly implicit declaration, where the size is fixed at 4 and values given.
declare : array : exa4{1,2,3,4}
// loose array datatype. This is the strictly implicit declaration, where the size is not fixed at 4, but the values were given to start.
// For all of these, you may also choose not to provide values, but the array will need to be defined later.

// Also, arrays are similar to strings by way of indices. An array can be given an explicit type, like:
declare : array[integer] : exa4{1,2,3,4}
// If unspecified, though, the array will be dynamically typed permanently and will not complex without a special command.

declare : boolean : exb = TRUE;
// boolean datatype. Assumes the TRUE value, which is equivalent to 1.
// Also supports the FALSE value, which is equivalent to 0... And NaN, which is the equivalent to null in other languages.
```

As promised, the common functions, too! These all return values, so make sure to store them!

```rust
run pow(#number, #integer)
// Classic power function: A^B

run root(#number, #integer)
// Optimized root function, better than using power for roots: A^(1/B)

run abs(#number)
// |A|

run max(#number,#number)
// Determines which input is the maximum.

run min(#number,#number)
// Determines which input is the minimum.

run random(#number,#number, #/boolean)
// Returns a value from A to B, inclusive (listed in order). If the last digit must be exclusive, you may pass TRUE into the optional third argument.

run round(#number, #integer)
// Rounds a number up to an integer number of decimal places. Automatically rounds up.
  ted.  on to arrays results in a loose array.

complex argument : #datatype
// Complexes an extended primitive datatype such as a vector or an array, or functions with datatypes.
```

Whoo! That a was a lot, wasn't it?  
Never fear, there's only a little more left to learn before you understand the basics of the language.

Let's talk about if-else statements and loops.

Iterative Loops (for loops) are extended primitive datatypes that **cannot** be complexed. For this reason, we call it a simpleton dataclass.

Iterative Loops are very interesting as they can remain undefined just like functions and variables until expanded. Once again, we will discuss expansions later, but for now, understand that they can be treated just like a variable.

See this:

```rust
declare : iterativeloop : myloop = [i = 0, i < 1000, i++]{...}
// This segment declares an iterativeloop that is called myloop. The brackets denote the bounds of the loop, where the loop will begin at 0, increment by 1 each iteration, and end once i = 1000.
// Inside the curly braces is where you put your code. This is the strictly explicit construction.

// Here are some more constructions.
declare : iterativeloop : myloop = [i = 0, i < 1000, i++]{...}
declare myloop2 = [i = 0, i < 1000, i++]{...}
declare myloop3[i = 0, i < 1000, i++]{...}
declare myloop4[i = 0, i < 1000, i++]
// Note that this loop has no code associated to it. More on that later.
define funct() = myloop5[i = 0, i < 1000, i++]
// Note that the "declare" keyword is not required if a function only consists of a loop. More on that later.
```

Lots of ways to make iterative loops. Indefinite (while) loops function similarly...

```rust
declare : integer : i = 0
declare : indefiniteloop : myloop = [i < 10]{...}
// This segment declares an indefinite loop that is called myloop. The brackets denote the condition of the loop. It has the same construction syntax as does iterativeloops. However, note that you will have to define i beforehand.
// Inside the curly braces is where you put your code. This is the strictly explicit construction.
```

No surprises! Loops are the same, just formed as a simpleton dataclass.

If-Else statements will be syntactically different from most other languages, though.  
Instead of the usual process where you write an if statement with the condition, then the code, then the else statement, DeFunct uses branches. How do branches work? Well... It is a little complicated.

Let's look at this code:

```rust
define f(x) = {f(x-2) + 1 if (x > 0)}
expand f(x) = {f(x+1) - 1 if (x < 0)}
expand f(x) = {return 2 if (x = 0)}
// This defines a function with a single line, which is a branch. Essentially, this branch acts as a single if statement. However, we later expand our function to include a new branch. We can do this however many times we want, so long as the original branch is still in direct line of the expansion.

// This can get confusing really quickly, so I will display what the function looks like from a critical level:
// f(x) = {A, B, C}
// Internally, the function is split into three sections. A is our initial branch, what we defined.
// Each expansion is then added after eachother in the function definition. So now, when f(x) is run, all three lines run in order.

// This is where the dynamic functions aspect comes in. Expansions can be done anytime in a program. They can also be moved around by a command, "align", which works like:
align f(x) = [2,3]
// Which makes our int
shrink h(x) = [3]
// The "shrink" keyword allows for the removal of branches internally from a function.
// This allows you to remove code without completely clearing the definition. Only works for functions or simpleton dataclasses.

delete h(x)
// This removes h(x) from memory. While functions and variables that do not get used after a while are naturally handled as trash, it is nice.  ernal function swap the 2nd expansion with the third, so,
// f(x) = {A, C, B}
// This can be used anytime.
// Now that expansions are out of the way, if statements work by expanded code best, but it can also be defined in the same definition. See g(x) below:

define g(x) = {
 run g(x-2) + 1 if (x > 0)
 run g(x+1) - 1 if (x < 0)
 return 2 if (x = 0)
}

// Here, the run commands are required as the function is now in an extended fashion, so each line now has to be differentiated from the other. The if branches themselves do not have an else keyword at all, and instead only function by "if" branches. Again, the accompanying branches function exactly as an else statement as long as it is connected to the original if statement.
```

That's all folks! At least, that's all for the if-statements and loops.

The last thing we need to cover are a few more properties of expansions. See the code snippet below.

```rust
// Remember how loops can be undefined? Well, they can be expanded!
declare myloop[i = 0, i < 1000, i++]

expand myloop = {...}
// Boom! Now the loop has a definition inside the curly braces, assuming there is code inside. This definition can be expanded and changed over time as the program runs! Loops have another really interesting property regarding scopes, which we'll discuss now!

define f(x) = {myloop2[i = 0, i < x, i++]}
expand myloop2 = {...}
// Here, you may notice that the bounds for myloop2 involve the argument for the function f(x). As a consequence, myloop2 cannot be run outside of a function. When it is expanded, it can take on the values of "x" and "i", as indicated by the bounds. But what happens in a situation like this?:

define g(x) = {myloop2}
// Conflicting variables! But never fear, this is where scope comes into play. If a function, g(x) is defined to have the same named argument as does the variable in myloop2, then g(x) will allow myloop2 to run, but with x relating to g(x). If the function instead had a name of g(n), it would no longer be valid and myloop2 would throw an UNKNOWNVAREXCEPTION.

// A few more topics!

clear myloop2
// The "clear" keyword removes all functional definitions from myloop2, except the bounds.
// This command can be run on fixed arrays and functions, too.

define h(x) = {h(x-2) + 1 if (x > 0)}
expand h(x) = {h(x+1) - 1 if (x < 0)}
expand h(x) = {return 2 if (x = 0)}
shrink h(x) = [3]
// The "shrink" keyword allows for the removal of branches internally from a function.
// This allows you to remove code without completely clearing the definition. Only works for functions or simpleton dataclasses.

delete h(x)
// This removes h(x) from memory. While functions and variables that do not get used after a while are naturally handled as trash, it is nice.
```

Congratulations! You made it through the majority of the language. Be rest assured that common functions and other information will be provided during the Theoretical Assessment via a packet, but do not rely on this to guarantee your success. Get associated with the language!

This page will likely be updated over time.  
**Goodluck!**
