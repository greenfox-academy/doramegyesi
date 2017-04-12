from tkinter import *

root = Tk()

canvas = Canvas(root, width = 720, height = 720, background = "black")
canvas.pack()

map = [
	[0,0,1,0,0,,0,0,0,0],
	[0,1,1,0,0,1,0,0,0,0],
	[0,1,0,0,0,1,1,1,0,0],
	[0,0,0,0,0,0,1,0,0,0],
	[0,1,1,0,0,0,1,0,0,0],
	[0,0,1,0,0,0,0,0,0,1],
	[0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,1,0,0,0,1,0],
    [0,1,0,0,1,1,0,0,0,0],
    [0,0,0,0,0,1,0,0,0,0]
]

class FieldMap():
    def __init___(self):
        self.img_floor = PhotoImage(file = "floor.png")
        self.img_wall = PhotoImage(file = "wall.png")

class Characters():
    def __init__(self):
        #self.img_floor = PhotoImage(file = "floor.png")
        #self.img_wall = PhotoImage(file = "wall.png")
        self.img_hero_up = PhotoImage(file = "hero-up.png")
        self.img_hero_down = PhotoImage(file = "hero-down.png")
        self.img_hero_left = PhotoImage(file = "hero-left.png")
        self.img_hero_right = PhotoImage(file = "hero-right.png")
        self.img_boss = PhotoImage(file = "boss.png")
        self.img_skeleton = PhotoImage(file = "skeleton.png")



root.mainloop()
