Jonathan Petersen
A01236750

Race Tracker Assignment

This assignment is only partially completed, but it should compile and run properly with Java 8 
installed. To use, compile all of the source files in the src directory, and start the server with 
`java Server`.

Once the server is running, you can test the functionality of the program by running the provided 
SensorSimulator. Currently the Server only listens on port 14000, though it can accept connections 
from any networked or port-forwarded computer. 

As the simulation is running, the server console will print out a list of racers and race groups for
each packet it receives. The Cheating computer will also print a line saying it has received the 
racer state, though no cheating detection is implemented.

UML documentation is included in the uml folder representing the current state of the assignment.
Formal unit test cases have not been defined. As such, an esitmated breakdown of the project status
is as follows:

----------------------------------------------------------------------------------------------------
Clear, Concise UML Diagrams: 30%	Class Diagram is accurate, but no interaciton or state diagrams.

Working Implementation:		 40% 	Of the 6 Functional Requirements specified in the .pdf, 1, 2, 3,
									and 4 are fully functional. 5 is completely non-functional, and 
									6 is only minimally functional. I have implemented the Observer
									design pattern in my RaceView and CheatingComputer class.

Meaningful Test Cases:		 0%		No test cases are provided.

Systems Testing:			 100%	The system correctly gathers all of the data provided by the
									simulator and properly notifies existing components of the 
									program.
----------------------------------------------------------------------------------------------------
Overall Progress:			 42%
