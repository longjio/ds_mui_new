// src/pages/AccordionPage.tsx

import React from 'react';
import { Stack, Typography, Box, List, ListItem, ListItemText, Divider } from '@mui/material';
import DsAccordion from '../components/surface/DsAccordion'; // DsAccordion 컴포넌트 경로에 맞게 수정해주세요.

const AccordionPage = () => {
    return (
        <Stack spacing={1.5} sx={{ p: 3 }}>
            <Typography variant="h1" component="h1" gutterBottom>
                Accordion
            </Typography>

            {/* 예시 1: 기본 아코디언 */}
            <Box>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 1 }}>
                    기본 아코디언
                </Typography>
                <DsAccordion title="아코디언 제목 1">
                    <Typography>
                        여기는 첫 번째 아코디언의 내용입니다. 이 내용은 기본적으로 숨겨져 있으며,
                        제목을 클릭하면 펼쳐집니다.
                    </Typography>
                </DsAccordion>
                <DsAccordion title="아코디언 제목 2 (다른 내용)">
                    <Typography variant="body2" color="text.secondary">
                        이것은 두 번째 아코디언의 상세 내용입니다. 다양한 텍스트 스타일과 컴포넌트를
                        내부에 포함할 수 있습니다.
                    </Typography>
                    <List dense>
                        <ListItem>
                            <ListItemText primary="항목 1" />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary="항목 2" />
                        </ListItem>
                    </List>
                </DsAccordion>
            </Box>

            <Divider sx={{ my: 2, border: 0 }} />

            {/* 예시 2: 기본적으로 펼쳐진 아코디언 */}
            <Box>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 1 }}>
                    기본적으로 펼쳐진 아코디언
                </Typography>
                <DsAccordion title="처음부터 펼쳐진 아코디언" defaultExpanded>
                    <Typography>
                        이 아코디언은 <code>defaultExpanded</code> prop이 <code>true</code>로 설정되어 있어
                        페이지 로드 시 기본적으로 내용이 펼쳐져 있습니다.
                    </Typography>
                </DsAccordion>
            </Box>

            <Divider sx={{ my: 2, border: 0 }} />

            {/* 예시 3: 비활성화된 아코디언 */}
            <Box>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 1 }}>
                    비활성화된 아코디언
                </Typography>
                <DsAccordion title="비활성화된 아코디언 (클릭 불가)" disabled>
                    <Typography>
                        이 아코디언은 <code>disabled</code> prop이 <code>true</code>로 설정되어 있어
                        사용자가 펼치거나 닫을 수 없습니다.
                    </Typography>
                </DsAccordion>
                <DsAccordion title="일반 아코디언 (비활성화 아님)" defaultExpanded>
                    <Typography>
                        이것은 비교를 위한 일반 아코디언입니다.
                    </Typography>
                </DsAccordion>
            </Box>

            <Divider sx={{ my: 2, border: 0}} />

            {/* 예시 4: 여러 아코디언 그룹 */}
            <Box>
                <Typography variant="h6" component="h2" gutterBottom sx={{ mb: 1 }}>
                    여러 아코디언 그룹
                </Typography>
                <DsAccordion title="설정 섹션 1">
                    <Typography>첫 번째 설정 그룹의 내용입니다.</Typography>
                </DsAccordion>
                <DsAccordion title="설정 섹션 2">
                    <Typography>두 번째 설정 그룹의 내용입니다. 여기에는 더 많은 정보가 들어갈 수 있습니다.</Typography>
                </DsAccordion>
                <DsAccordion title="설정 섹션 3" defaultExpanded>
                    <Typography>세 번째 설정 그룹은 기본적으로 펼쳐져 있습니다.</Typography>
                </DsAccordion>
            </Box>
        </Stack>
    );
};

export default AccordionPage;