Jonathan Petersen
A01236750
CS 5700 - Object Oriented Software Development
HW5 - Work Breakdown Structure (WBS) Assignment
====================================================================================================

Introduction - 
	
	This is a program for creating and modeling Work Breakdown Structures as a heiarchy of related 
tasks. It has utilities to create and save WBS trees, and basic scheduling facilites as well. It was
created by Jonathan Petersen during his Senior Year at Utah State University.


Compiling - 
	
	This program was written in C++11, and you'll need a modern C++ compiler to run it. It was 
tested and developed using g++ 4.9.3, part of the gcc collection. Compile all of the .cpp files in 
the src/ directory to build the unit test executable. The command to do this should look like:

	g++ -std=c++11 src/*.cpp -o WBS.exe


Requirements - 

	The requirements of each part of the program are as follows:
	
	1. The class library needs to support WBS’s, where a WBS is a hierarchy of Tasks.
	2. The class library needs to include an Engineer class whose instance can capture basic 
		information about the available engineers	
	3. The class library needs to provide tools for constructing and manipulating a WBS. 
	4. The class library needs to provide tools for setting up a team of engineers and their 
		availability
	5. The class library needs convenient tools for creating estimated schedules for remaining work
	6. The class library needs to provide a convenient way to get list of a Tasks to which a given 
		engineer has been assigned.
	7. The class library needs to provide a convenient way to print a WBS in an outline form to a 
		text file.

	A. Model the Solution with UML Class and Interaction Diagrams
	B. Find appropriate uses of the Composite, Iterator, Visitor, and Builder pattern, while 
		creating a quality solution.
	C. Create Thorough Unit Test Cases

Results - 
	
	The estimated completion of each objective is as follows:

	1. 100% complete. 	The WBS Tree as described in the UML is fully functional.
	2. 100% complete. 	The Engineer class fully meets the specifications.
	3. 50% complete.	It is currently possible to export any part of the tree to XML, 
						but no funcitonality exists yet to import parts of the tree.
	4. 100% complete.	The EngineerTeam and Workforce classes meet the required specifications.
	5. 15% complete.	Basic classes have been written to handle scheduling, but no major 
						functionality is present.
	6. 0% complete.		Not Yet Implemented
	7. 100% complete.	The OutlineVisitor class handles writing the WBS to a text file.

	A. 100% complete.	Class and Interaction diagrams can be found in the uml/ directory.
	B. 80% complete.
		Composite Pattern:	This can be found in both the ParentTask and EngineerTeam classes. This
							pattern was chosen because I needed to be able to write algorithms that 
							operated on both Tasks and Engineers regardless of whether I was dealing
							with a single Task / Engineer or a group of them. One good example of 
							this is being able to add either hierarchies of tasks or single tasks
							to a parent task with a single funciton, addTask().
		Iterator Pattern:	This can be found in the TreeIterator class. Note that only the 
							specialization of the iterator is required, because C++ offers native
							support for iterators though the .begin() and .end() methods 
							overloaded in ParentTask, and the operator overloading in TreeIterator.
							This iterator is used heavily by the Visitor classes to quickly travel
							through the WBS tree using modern C++ features.
		Visitor Pattern:	The TaskVisitor, OutlineVisitor, and XMLOutputVisitor use this pattern.
							I chose to implement it in these classes since the XML and outline 
							output needed to serialize differently for each type of node, but I 
							could use it in conjuction with the iterator pattern to effectively 
							translate the whole tree.
		Builder Pattern:	The TaskBuilder class utilizes this pattern. Because there is only one 
							instance of Builder in the current program, I've removed the Builder 
							base class, so only the ConcreteBuilder remains, though it's worth 
							nothing that it's still much simpler than creating the objects by hand. 
							This is used heavily by the unit test cases.
	C. 100% complete.	Unit tests can be found in the .cpp files of the classes they test, with 
						more complex tests found in the ComplexTests.cpp file. The Catch C++ Unit
						Test Framework was used, and tests can be run simply by running the
						executable compiled as above.

	OVERALL: ~75% complete.
