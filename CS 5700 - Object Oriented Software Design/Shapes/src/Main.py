# Jonathan Petersen
# A01236750
# Shapes Assignment
# Driver Code

import AreaFinder
import Input
import Output

testShapes = {
	"Circle":{"Radius":10.0},
	"Circle":{"Radius":12.0},
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
	input.strategy = Input.xmlStrategy;
	alpha = input.readFile("test.xml");
	input.strategy = Input.jsonStrategy;
	beta = input.readFile("test.json");

	finder = AreaFinder.AreaFinder();
	results = finder.computeAreas(alpha["Shapes"]);

	# print(results);

	output = Output.Output(Output.jsonStrategy);
	output.writeFile(results);

	# if (dict == testShapes):
	# 	print("Victory!");

