import { PortfolioData } from './types';

export const INITIAL_DATA: PortfolioData = {
  profile: {
    name: "S.M. CHOI",
    mainTitle: "조직의 시작부터 운영 안정화까지 경험한 경영지원형 HR",
    subTitle: "채용, 급여, 노무, 총무를 넘어 회계·세무·자금관리까지 수행하며 조직 운영의 기준을 만들고 실행해온 인사총무 담당자입니다.",
    oneLineIntro: "인사총무의 기본기 위에 전사 운영 역량을 확장해온 경영지원 담당자",
    heroBadge: "Expertise in Human Resources",
    heroCardLabel: "Strategic Performance",
    heroAchievements: [
      "채용 유입 성과 개선",
      "노무 리스크 0건 유지",
      "핵심인력 이탈 방지 및 조직 안정화"
    ],
    summary: {
      totalExperience: "7년 3개월",
      experienceDesc: "7 Years of\nHR & Business Operations",
      recentJob: "메디허브 경영지원팀 팀장",
      majorAreas: "인사, 채용, 급여, 노무, 총무, 회계, 세무, 자금관리",
      strengths: "조직 운영 체계 구축, 노무 리스크 예방, 전사 운영 지원",
      keyAchievements: "지원자 수 약 30배 증가, 주요 노무 분쟁 0건"
    }
  },
  about: {
    title: "인사총무의 기본기에서 출발해 전사 운영으로 확장해온 사람",
    content: "저는 대보건설에서 채용과 총무 업무를 수행하며 인사총무의 기본기를 쌓았고, 이후 메디허브에서는 회사 초기 멤버로 합류하여 전사 인사총무 및 경영지원 전반을 담당했습니다.\n\n메디허브에서는 인사·총무 프로세스가 체계적으로 갖춰지지 않은 환경에서 채용, 급여, 근태, 노무, 총무, 회계·세무, 자금관리까지 폭폭넓게 수행하며 조직 운영 기반을 만들었습니다. 특히 근로계약서, 취업규칙, 근태·연차 기준, 급여 운영 체계 등을 정비하여 조직이 안정적으로 운영될 수 있도록 했습니다.\n\n저는 인사총무를 단순 지원 업무가 아니라, 조직이 안정적으로 성장하기 위한 운영 인프라라고 생각합니다. 회사와 구성원 사이에서 균형을 잡고, 문제 발생 후 대응하기보다 사전에 기준을 세워 리스크를 줄이는 방식으로 일해왔습니다.",
    workStyles: [
      {
        title: "기준을 먼저 세웁니다",
        description: "반복되는 업무일수록 개인의 감각이나 기억에 의존하기보다, 명확한 기준과 프로세스를 만드는 것이 중요하다고 생각합니다."
      },
      {
        title: "회사와 구성원 사이의 균형을 고민합니다",
        description: "회사의 현실적인 상황 안에서 구성원이 납득할 수 있는 방식을 찾고, 필요한 경우 경영진과 구성원 사이에서 커뮤니케이션을 조율합니다."
      },
      {
        title: "문제 발생 전 리스크를 줄입니다",
        description: "노무 이슈는 발생 후 대응보다 예방이 중요하다고 생각합니다. 기본적인 영역을 사전에 점검하고 노무사와 협업하여 리스크를 줄입니다."
      },
      {
        title: "필요한 역량은 스스로 학습합니다",
        description: "조직 운영에 필요한 회계, 세무 등 새로운 전문 영역도 스스로 학습하고 자격증을 취득하며 실무에 적용해왔습니다."
      }
    ]
  },
  careers: [
    {
      id: "medihub",
      company: "메디허브",
      position: "경영지원팀 팀장",
      period: "2022.03 ~ 2026.02",
      description: "AI 기반 의료자문 헬스케어 플랫폼 기업 / 임직원 약 10~15명",
      role: "초기 조직의 운영 체계를 구축하고, 사업 정리 단계까지 경영지원 전반을 담당한 실무 리더",
      tasks: [
        "회사 초기 멤버로 합류하여 조직 운영 체계 구축",
        "채용 계획 수립, JD 정비, 후보자 서칭, 면접 운영, 온보딩",
        "급여, 4대보험, 연말정산, 퇴직금, 근태, 연차 운영",
        "근로계약서, 취업규칙, 인사 규정 정비 및 노무 리스크 예방",
        "회계 기장, 결산, 세무, 자금 집행 및 현금 흐름 관리",
        "주주총회, 이사회, 증자·감자 등 지배구조 업무 지원"
      ],
      achievements: [
        "지원자 수 및 이력서 공개율 약 30배 증가",
        "급여 오류 및 지연 0건, 주요 노무 분쟁 0건",
        "회사 설립 후 핵심인력 퇴사 0건",
        "2024년 8월 이후 자진퇴사 0건",
        "사직 의사자 면담을 통한 잔류 전환 2건"
      ]
    },
    {
      id: "daebo",
      company: "대보건설",
      position: "인사총무팀 주임 / 팀원",
      period: "2018.12 ~ 2022.02",
      description: "국내 중견 건설사 / 임직원 약 600명",
      role: "채용과 총무 실무를 통해 인사총무의 기본기를 쌓은 기간",
      tasks: [
        "채용공고 게시 및 채용 채널 운영",
        "공채 및 수시채용 실무 전반 (서칭, 일정 관리, 온보딩)",
        "사내 채용 플랫폼 개발 프로젝트 기획 참여",
        "법인차량 및 사무실 환경 관리",
        "장애인 고용부담금 감면 업무 수행"
      ],
      achievements: [
        "채용 프로세스 운영 및 실무 경험 확보",
        "사내 채용 플랫폼 기획을 통한 프로세스 개선 기여",
        "장애인 고용부담금 감면을 통한 비용 절감"
      ]
    }
  ],
  projects: [
    {
      id: "p1",
      title: "초기 조직 운영 체계 구축",
      problem: "메디허브 합류 당시 인사·총무 운영 기준과 프로세스가 전무한 상태였습니다.",
      role: "전사 경영지원 담당자로서 인사총무 운영 체계 직접 구축",
      execution: [
        "근로계약서 및 인사 서류 정비",
        "취업규칙 및 내부 인사 규정 관리 체계 수립",
        "입퇴사, 근태, 급여, 연차 운영 프로세스 구축",
        "사내 자산, 비품, 계약 관리 체계 정비"
      ],
      results: [
        "조직 운영 기준 명확화로 업무 혼선 감소",
        "업무의 반복성과 안정성 확보",
        "회사 성장 단계에 맞는 운영 기반 마련"
      ]
    },
    {
      id: "p2",
      title: "채용 프로세스 개선 및 지원자 유입 확대",
      problem: "낮은 인지도와 고비용 채용 서비스 의존으로 우수 인재 확보에 어려움이 있었습니다.",
      role: "채용 전 과정 (JD 작성 ~ 온보딩) 단독 운영",
      execution: [
        "직무별 JD 및 채용공고 문구 문안 개선",
        "이력서 공개 제안서 문구 개편을 통한 직접 제안 강화",
        "저비용 채용 채널 적극 활용 및 후보자 수천 건 서칭",
        "면접관 안내 가이드 배포 및 평가 기준 수립"
      ],
      results: [
        "지원자 수 및 이력서 공개율 약 30배 증가",
        "고비용 채용 서비스 의존도 감소 및 비용 절감",
        "다양한 직군(개발, 기획, 마케팅 등) 채용 운영 성공"
      ]
    },
    {
      id: "p3",
      title: "노무 리스크 예방 및 안정적 인력 운영",
      problem: "사업 피봇팅 및 경영 악화 시 발생할 수 있는 근로계약, 해고 등 노무 리스크 관리 필요",
      role: "노무사 협업을 통한 사전 검토 및 커뮤니케이션 관리",
      execution: [
        "근로계약서, 취업규칙 등 법적 문서 정기 검토",
        "노동관계법 변경사항 상시 모니터링 및 반영",
        "인력 조정 절차 가이드라인 수립",
        "경영 악화에 따른 투명한 커뮤니케이션 지원"
      ],
      results: [
        "재직기간 중 주요 노무 분쟁 0건",
        "노동청 진정, 임금체불 등 법적 이슈 발생 0건",
        "사업 정리 단계에서도 원만한 인력 운영 유지"
      ]
    },
    {
      id: "p6",
      title: "회계·세무·자금관리 업무 확장",
      problem: "소규모 조직 특성상 인사총무 외에 재무적 운영 역량 필요",
      role: "회계 및 자무관리 역량 자발적 확보 및 실무 적용",
      execution: [
        "회계 기장 및 월·분기 결산 수행",
        "부가세, 원천세 신고 및 세무조정 대응",
        "자금 집행 및 현금 흐름 관리",
        "모회사 연결재무제표 대응"
      ],
      results: [
        "회계·세무 실무 자격(전산회계 1급/2급) 취득 및 전문성 확보",
        "경영지원 전반의 운영 정확도 및 신뢰성 제고",
        "인사총무를 넘어 전사 운영을 보는 시야 확장"
      ]
    }
  ],
  skills: {
    introduction: "인사총무의 기본기 위에 회계·세무·자금관리까지 확장하며, 조직 운영에 필요한 실무 역량을 쌓아왔습니다. 명확한 기준이 없는 환경에서는 업무 프로세스를 직접 구축하고, 민감한 영역은 전문가와 협업하여 리스크를 줄이는 방식으로 일해왔습니다.",
    hardSkillsTitle: "Hard Skills (Professional Expertise)",
    softSkillsTitle: "Soft Skills (Strategic Mindset)",
    hardSkills: [
      {
        id: "hs-1",
        name: "HR Operations",
        description: "채용, 입퇴사, 근태, 급여, 연말정산 등 인사 운영 전반"
      },
      {
        id: "hs-2",
        name: "Labor & ER Management",
        description: "근로계약, 취업규칙, 근태·연차 기준 정비 및 노무 리스크 관리"
      },
      {
        id: "hs-3",
        name: "Finance & Tax Support",
        description: "회계, 세무, 원천세, 부가세, 법인결산, 자금관리 실무"
      },
      {
        id: "hs-4",
        name: "General Affairs & Asset Management",
        description: "자산, 비품, 사무환경, 사내행사 등 총무 운영"
      },
      {
        id: "hs-5",
        name: "Collaboration & Productivity Tools",
        description: "Slack, Notion, Confluence, Google Workspace, FLEX, Python 활용"
      }
    ],
    softSkills: [
      {
        id: "ss-1",
        name: "Process Building",
        description: "기준이 없는 업무를 체계화하고 반복 가능한 프로세스로 정리"
      },
      {
        id: "ss-2",
        name: "Problem Solving",
        description: "조직 운영상 문제를 발견하고 실행 가능한 개선안 도출"
      },
      {
        id: "ss-3",
        name: "Communication",
        description: "경영진, 구성원, 외부 전문가 사이의 커뮤니케이션 조율"
      },
      {
        id: "ss-4",
        name: "Risk Management",
        description: "노무·급여·세무 등 민감 영역의 사전 점검 및 리스크 예방"
      },
      {
        id: "ss-5",
        name: "Self-Learning",
        description: "필요한 업무 역량을 스스로 학습하고 실무에 빠르게 적용"
      }
    ]
  },
  competencies: [
    {
      id: "hr-op",
      title: "HR Operation",
      description: "입퇴사, 근태, 급여, 연차 등 인사 운영 체계를 구축하고 관리합니다.",
      skills: ["근로계약 및 서류 정비", "취업규칙/인사규정 관리", "급여 및 4대보험", "입퇴사 프로세스"]
    },
    {
      id: "recruit",
      title: "Recruitment",
      description: "채용 계획 수립부터 온보딩까지 전 과정을 수행하며 인재 유입을 확대합니다.",
      skills: ["JD 및 공고 개선", "후보자 서칭/제안", "면접 운영", "온보딩 지원"]
    },
    {
      id: "labor",
      title: "Labor Risk",
      description: "노무 리스크를 사전에 식별하고 예방하여 안정적인 조직 운영을 지원합니다.",
      skills: ["노동법 이슈 분석", "노무사 자문 협업", "규정 준수 여부 점검", "인력 조정 관리"]
    },
    {
      id: "finance",
      title: "Finance Support",
      description: "회계, 세무, 자금 등 재무적 기초 업무를 병행하여 경영지원의 완결성을 높입니다.",
      skills: ["회계 기장/결산", "부가세/원천세 신고", "자금 집행 관리", "세무사무소 응대"]
    }
  ],
  education: [
    {
      id: "kw",
      school: "광운대학교",
      major: "동북아문화산업학부 졸업",
      period: "2012.03 ~ 2019.02"
    },
    {
      id: "hit",
      school: "하얼빈이공대학",
      major: "교환학생",
      period: "2016.08 ~ 2017.07"
    }
  ],
  certificates: [
    {
      id: "soc",
      name: "사회보험전문가",
      date: "2026.04",
      meaning: "4대보험 및 인사노무 실무 전문성 보완"
    },
    {
      id: "acc1",
      name: "전산회계 1급",
      date: "2022.12",
      meaning: "회계·세무 실무 수행 역량 확보"
    },
    {
      id: "acc2",
      name: "전산회계 2급",
      date: "2022.08",
      meaning: "재무적 기초 지식 수립"
    },
    {
      id: "aice",
      name: "AICE Associate",
      date: "2026.02",
      meaning: "데이터 기반 업무 개선 역량"
    }
  ],
  sectionTitles: {
    home: { title: "HOME", subtitle: "Strategic HR Professional" },
    about: { title: "ABOUT ME", subtitle: "Story & Strategy" },
    career: { title: "EXPERIENCE", subtitle: "Career Journey" },
    projects: { title: "PROJECTS", subtitle: "Problem & Solution" },
    skills: { title: "SKILLS", subtitle: "Expertise & Methodologies" },
    competency: { title: "COMPETENCY", subtitle: "Core Performance" },
    education: { title: "EDUCATION & CREDENTIALS", subtitle: "Growth & Learning" },
    certificates: { title: "Credentials", subtitle: "Certifications & Licensing" },
    contact: { title: "CONTACT", subtitle: "Connect & Inquire" }
  },
  contact: {
    summary: "좋은 조직 운영은 명확한 기준에서 시작된다고 믿습니다.\n조직이 안정적으로 운영될 수 있도록, 필요한 기준을 만들고 꾸준히 개선하겠습니다.",
    email: "mins6060@gmail.com",
    emailLabel: "Digital correspondence",
    phone: "010-XXXX-XXXX",
    phoneLabel: "Mobile connectivity"
  }
};
