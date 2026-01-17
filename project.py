# 번호를 입력받아 해당 단의 구구단 출력 (2~19단)
while True:
    try:
        num = int(input("구구단 번호를 입력하세요 (2~19, 종료하려면 0): "))
        
        if num == 0:
            print("프로그램을 종료합니다.")
            break
        
        if num < 2 or num > 19:
            print("2부터 19까지의 숫자만 입력 가능합니다.")
            continue
        
        print(f"\n{num}단")
        print("-" * 20)
        for j in range(1, 20):
            result = num * j
            print(f"{num} × {j} = {result}")
        print()
        
    except ValueError:
        print("숫자를 입력해주세요.")
    except KeyboardInterrupt:
        print("\n프로그램을 종료합니다.")
        break