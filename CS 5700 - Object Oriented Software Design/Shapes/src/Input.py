# Jonathan Petersen
# A01236750
# Shapes Assignment
# Input Base Class

import json

class Input:
	def readFile(self, filename):
		raise NotImplementedError;

class JsonInput(Input):
	def __init__(self):
		fp = open("example.json", "w")
		fp.write("Hello World!")

	def readFile(self, filename):
		self.contents = json.load(filename.open());
		return;

class XmlInput(Input):
	def readFile(self, filename):
		return;



