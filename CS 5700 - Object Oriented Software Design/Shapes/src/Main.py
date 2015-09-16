# Jonathan Petersen
# A01236750
# Shapes Assignment
# Driver Code

import Input
import Output

testShapes = {
	"Circle":{"Radius":10.0},
	"Square":[	{"Point":[{"x":1},{"y":1}]}, 
				{"Point":[{"x":-1},{"y":1}]}, 
				{"Point":[{"x":-1},{"y":-1}]}, 
				{"Point":[{"x":1},{"y":-1}]}],
	"Triangle":[{"Point":[{"x":0},{"y":1}]}, 
				{"Point":[{"x":-1},{"y":0}]}, 
				{"Point":[{"x":1},{"y":0}]}],
	"Ellipse":[	{"SubMajorAxis": 3.0}, 
				{"SubMinorAxis": 1.5}]
};


if __name__ == "__main__":
	input = Input.Input();
	input.strategy = Input.jsonStrategy;
	dict = input.readFile("test.json");

	output = Output.Output(Output.xmlStrategy);
	# output.strategy = Output.stdoutStrategy;
	output.writeFile(testShapes);

	if (dict == testShapes):
		print("Victory!");

