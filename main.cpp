#include <raylib.h>

struct Screen
{
    const int Width;
    const int Height;
};

struct Ball 
{
    int PosX;
    int PosY;
    int Radius;
};

void travelPos(const Screen &screen, Ball &ball);

// DEFINITIONS
const Screen screen = { 600, 600 };
Ball ball = { screen.Width / 2, screen.Height / 2, screen.Height / 16 };

int main()
{
    InitWindow(screen.Width, screen.Height, "Raylib Example - Ball");

    SetTargetFPS(60);

    // GAME LOOP
	// this will run 60 times/s
    while (!WindowShouldClose())
    {
        // Event Handling
		if (IsKeyDown(KEY_RIGHT))
		{
			ball.PosX += 3;
		} else if (IsKeyDown(KEY_LEFT))
		{
			ball.PosX -= 3;
		} else if (IsKeyDown(KEY_UP))
		{
			ball.PosY -= 3;
		} else if (IsKeyDown(KEY_DOWN))
		{
			ball.PosY += 3;
		}
		travelPos(screen, ball);

        // Drawing
        BeginDrawing();

            ClearBackground(SKYBLUE);
            
            DrawCircle(ball.PosX, ball.PosY, ball.Radius, RED);

        EndDrawing();
    }

    CloseWindow();

    return 0;
}

void travelPos(const Screen &screen, Ball &ball)
{
	if (ball.PosX < 0)
	{
		ball.PosX = screen.Width;
	} else if (ball.PosX > screen.Width)
	{
		ball.PosX = 0;
	}

	if (ball.PosY < 0)
	{
		ball.PosY = screen.Height;
	} else if (ball.PosY > screen.Width)
	{
		ball.PosY = 0;
	}
}