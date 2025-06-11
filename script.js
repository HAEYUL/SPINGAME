// DOM 요소 선택
const wheel = document.querySelector('.wheel-container');
const spinButton = document.getElementById('spin-button');
const resultText = document.getElementById('result-text');

// 룰렛 항목들
const items = [
    { text: '만두 2 알', probability: 10 },
    { text: '10% 할인', probability: 20 },
    { text: '미니샐러드', probability: 10 },
    { text: '음료수 한잔', probability: 20 },
    { text: '무료 커피', probability: 10 },
    { text: '꽝, 한번더!', probability: 30 }
];

// 룰렛이 돌아가는 중인지 확인하는 변수
let isSpinning = false;

// 랜덤 결과 선택 함수
function getRandomResult() {
    // 전체 확률 합계 계산
    const totalProbability = items.reduce((sum, item) => sum + item.probability, 0);
    
    // 랜덤 값 생성 (0 ~ totalProbability)
    const random = Math.random() * totalProbability;
    
    // 확률에 따라 결과 선택
    let probabilitySum = 0;
    for (const item of items) {
        probabilitySum += item.probability;
        if (random <= probabilitySum) {
            return item;
        }
    }
    
    // 기본값 반환 (발생하지 않아야 함)
    return items[0];
}

// 폭죽 효과 함수
function showConfetti() {
    // 여러 방향에서 폭죽 발사
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // 여러 방향에서 폭죽 발사
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
}

// 룰렛 회전 함수
function spinWheel() {
    if (isSpinning) return;
    
    isSpinning = true;
    spinButton.disabled = true;
    resultText.textContent = '행운을 찾는 중...';
    
    // 랜덤 결과 선택
    const result = getRandomResult();
    
    // 룰렛 회전 각도 계산 (5바퀴 + 결과 위치)
    const spinDegrees = 1800 + (Math.random() * 360); // 5바퀴(1800도) + 랜덤 각도
    
    // 룰렛 회전 애니메이션
    wheel.style.transform = `rotate(${spinDegrees}deg)`;
    
    // 5초 후 결과 표시
    setTimeout(() => {
        isSpinning = false;
        spinButton.disabled = false;
        resultText.textContent = `축하합니다! ${result.text}에 당첨되셨습니다!`;
        
        // 폭죽 효과 표시
        showConfetti();
    }, 5000);
}

// 이벤트 리스너 등록
spinButton.addEventListener('click', spinWheel);

// 초기 설정
resultText.textContent = '행운을 기다리는 중...'; 