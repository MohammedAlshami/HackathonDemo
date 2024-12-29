import subprocess

def run_command(command, cwd=None):
    try:
        process = subprocess.Popen(command, shell=True, cwd=cwd)
        return process
    except Exception as e:
        print(f"Failed to start command: {command}\nError: {e}")
        return None

def main():
    processes = []

    # Run Node.js server (Server 1)
    print("Starting Server 1 (npm)...")
    processes.append(
        run_command("npm run dev", cwd=r"C:\Users\USER\Desktop\Work\Competitions\MyHackathon\concept")
    )

    # Activate virtual environment and run Server 2
    print("Starting Server 2 (Python)...")
    processes.append(
        run_command(
            r"C:\Users\USER\Desktop\Work\drangue\Repos\BackendServer\nogpuenv\Scripts\activate && "
            r"python C:\Users\USER\Desktop\Work\drangue\Repos\BackendServer\main.py"
        )
    )

    # Activate virtual environment and run Server 3
    print("Starting Server 3 (Python)...")
    processes.append(
        run_command(
            r"C:\Users\USER\Desktop\Work\drangue\Repos\InferenceServer\gpuenv\Scripts\activate && "
            r"python C:\Users\USER\Desktop\Work\drangue\Repos\InferenceServer\main.py"
        )
    )

    print("All servers started. Press Ctrl+C to stop.")
    try:
        # Keep the script running while servers are running
        for process in processes:
            if process is not None:
                process.wait()
    except KeyboardInterrupt:
        print("\nShutting down servers...")
        for process in processes:
            if process is not None:
                process.terminate()

if __name__ == "__main__":
    main()
