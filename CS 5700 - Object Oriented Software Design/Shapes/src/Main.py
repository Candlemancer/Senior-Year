# Jonathan Petersen
# A01236750
# Shapes Assignment
# Driver Code

import AreaFinder
import Input
import Output

import os
import sys

if __name__ == "__main__":
	ingest = Input.Input();
	output = Output.Output();
	finder = AreaFinder.AreaFinder();
	inputType = "";
	outputType = "";

	print("Welcome to ShapeCalculator3000");

	print("What type of data would you like to input?");
	print("[1] JSON Data");
	print("[2] XML Data");
	print("[3] Quit");
	while(inputType not in ("1", "2", "3")):
		inputType = input("Choice [1, 2, 3]: ");
	if inputType == "1":
		ingest.setStrategy(Input.jsonStrategy);
	elif inputType == "2":
		ingest.setStrategy(Input.xmlStrategy);
	elif inputType == "3":
		sys.exit(0);

	fileLocation = "Q";
	while not os.path.exists(fileLocation):
		fileLocation = input("Please input the filename or path of the input file: ");
		print(fileLocation);
		if fileLocation == "Q":
			sys.exit(0);
		if not os.path.exists(fileLocation):
			print("File could not be found. Please try again or enter Q to quit.");
	data = ingest.readFile(fileLocation);
	results = finder.computeAreas(data["Shapes"]);

	print("How would you like to output the areas?");
	print("[1] Display on the screen");
	print("[2] Write to results.csv");
	print("[3] Write to results.json");
	print("[4] Quit");
	while outputType not in ("1", "2", "3", "4"):
		outputType = input("Choice [1, 2, 3, 4]: ");
	if outputType == "1":
		output.strategy = Output.stdoutStrategy;
	elif outputType == "2":
		output.strategy = Output.csvStrategy;
	elif outputType == "3":
		output.strategy = Output.jsonStrategy;
	elif outputType == "4":
		sys.exit(0);
	output.writeFile(results);

