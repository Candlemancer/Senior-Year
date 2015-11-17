# Jonathan Petersen
# A01236750
# Shapes Assignment
# AreaFinder Class

import math
import copy
import unittest

class AreaFinder:
	def computeAreas(self, shapes):
		results = [{"Total":0, "Circle":0, "Ellipse":0, "Triangle":0, "EquilateralTriangle":0,
					"IsocelsesTriangle":0, "Square":0, "Rectangle":0, "RegularPolygon":0, 
					"ConvexPolygon":0}];
		for shapeData in shapes:
			(k, v) = shapeData.popitem();
			if (k == "Circle"):
				if(len(v) == 1):
					a = ellipseStrategy(v + copy.deepcopy(v));
					results[0]["Total"] += a;
					results[0]["Circle"] += a;
					results[0]["Ellipse"] += a;
			if (k == "Ellipse"):
				if(len(v) == 2):
					a = ellipseStrategy(v);
					results[0]["Total"] += a;
					results[0]["Ellipse"] += a;
			if (k == "Triangle"):
				if(len(v) == 3):
					a = polygonStrategy(v);
					results[0]["Total"] += a;				
					results[0]["Triangle"] += a;
					results[0]["ConvexPolygon"] += a;				
			if (k == "EquilateralTriangle"):
				if(len(v) == 3):
					a = polygonStrategy(v);
					results[0]["Total"] += a;				
					results[0]["Triangle"] += a;				
					results[0]["RegularPolygon"] += a;
					results[0]["EquilateralTriangle"] += a;
					results[0]["ConvexPolygon"] += a;				
			if (k == "IsocelsesTriangle"):
				if(len(v) == 3):
					a = polygonStrategy(v);
					results[0]["Total"] += a;				
					results[0]["Triangle"] += a;				
					results[0]["IsocelsesTriangle"] += a;
					results[0]["ConvexPolygon"] += a;				
			if (k == "Square"):
				if(len(v) == 4):
					a = polygonStrategy(v);
					results[0]["Total"] += a;
					results[0]["Rectangle"] += a;
					results[0]["Square"] += a;
					results[0]["RegularPolygon"] += a;
					results[0]["ConvexPolygon"] += a;
			if (k == "Rectangle"):
				if(len(v) == 4):
					a = polygonStrategy(v);
					results[0]["Total"] += a;
					results[0]["Rectangle"] += a;
					results[0]["ConvexPolygon"] += a;				
			if (k == "RegularPolygon"):
				a = polygonStrategy(v);
				results[0]["Total"] += a;				
				results[0]["ConvexPolygon"] += a;				
				results[0]["RegularPolygon"] += a;
			if (k == "ConvexPolygon"):
				a = polygonStrategy(v);
				results[0]["Total"] += a;				
				results[0]["ConvexPolygon"] += a;
		return results;

def ellipseStrategy(axes):
	(a, b) = axes;
	return math.pi * a.popitem()[1] * b.popitem()[1];

def polygonStrategy(points):
	xList = [];
	yList = [];
	for pairs in points:
		(xCoord, yCoord) = pairs.popitem()[1];
		xList.append(xCoord["x"]);
		yList.append(yCoord["y"]);

	xList.append(xList[0]);
	yList.append(yList[0]);

	# print(xList.append(xList[0]));
	# print(yList);

	return (0.5 * (sum(a * b for a, b in zip(xList[:-1], yList[1:])) 
				 - sum(a * b for a, b in zip(xList[1:],  yList[:-1]))));

####################################################################################################

class AreaTest(unittest.TestCase):
	def testTriangle(self):
		testData = [{'Point': [{'x': 0.0}, {'y': 1.0}]}, {'Point': [{'x': -1.0}, {'y': 0.0}]}, 
		{'Point': [{'x': 1.0}, {'y': 0.0}]}];
		self.assertEqual(1.0, polygonStrategy(testData));
		return;

	def testSquare(self):
		testData = [{'Point': [{'x': 1.0}, {'y': 1.0}]}, {'Point': [{'x': -1.0}, {'y': 1.0}]}, 
		{'Point': [{'x': -1.0}, {'y': -1.0}]}, {'Point': [{'x': 1.0}, {'y': -1.0}]}];
		self.assertEqual(4.0, polygonStrategy(testData));
		return;

	def testCircle(self):
		testData = [{'Radius': 1.0}, {'Radius': 1.0}];
		self.assertEqual(math.pi, ellipseStrategy(testData));

	def testEllipse(self):
		testData = [{'SubMajorAxis': 1.0}, {'SubMinorAxis': 1.0}];
		self.assertEqual(math.pi, ellipseStrategy(testData));		

if __name__ == '__main__':
	unittest.main()


