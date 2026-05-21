import React from 'react';
import { Page, Text, View, Document, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 40, backgroundColor: '#FFFFFF', fontFamily: 'Helvetica' },
  header: { borderBottom: 2, borderBottomColor: '#FFD700', paddingBottom: 10, marginBottom: 20, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  logoSection: { display: 'flex', flexDirection: 'column' },
  logoText: { fontSize: 24, fontWeight: 'black', color: '#001529', fontStyle: 'italic' },
  logoSub: { fontSize: 8, textTransform: 'uppercase', color: '#003366', letterSpacing: 2 },
  reportTitle: { fontSize: 12, color: '#003366', fontWeight: 'bold' },
  metaSection: { marginBottom: 30 },
  metaText: { fontSize: 9, color: '#444', marginBottom: 3 },
  sectionTitle: { fontSize: 14, color: '#003366', fontWeight: 'bold', textTransform: 'uppercase', borderLeft: 4, borderLeftColor: '#FFD700', paddingLeft: 8, marginVertical: 15 },
  statsGrid: { flexDirection: 'row', gap: 10, marginBottom: 20 },
  statCard: { flex: 1, backgroundColor: '#F8F9FA', padding: 12, borderRadius: 4, textAlign: 'center' },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#003366' },
  statLabel: { fontSize: 7, textTransform: 'uppercase', color: '#666' },
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderColor: '#EEE', borderWidth: 0, borderBottomWidth: 1 },
  tableRow: { flexDirection: 'row', borderBottomColor: '#EEE', borderBottomWidth: 1, alignItems: 'center', height: 30 },
  tableHeader: { backgroundColor: '#003366', color: '#FFF' },
  tableCol: { width: '25%', paddingLeft: 5 },
  tableCell: { fontSize: 9, color: '#333' },
  impactText: { color: '#28A745', fontWeight: 'bold' },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', borderTop: 1, borderTopColor: '#EEE', paddingTop: 10, fontSize: 8, color: '#999' }
});

const ExecutiveReportPDF = ({ projects, stats }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header with Styled Logo */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <Text style={styles.logoText}>DIMENSIONS</Text>
          <Text style={styles.logoSub}>Management Consultants</Text>
        </View>
        <Text style={styles.reportTitle}>Executive Impact Report</Text>
      </View>

      {/* Metadata */}
      <View style={styles.metaSection}>
        <Text style={styles.metaText}>PREPARED FOR: Chief Executive Officer</Text>
        <Text style={styles.metaText}>DATE: May 21, 2026</Text>
        <Text style={styles.metaText}>HQ: Runhare House, Harare, Zimbabwe</Text>
      </View>

      {/* Summary Stats */}
      <Text style={styles.sectionTitle}>Performance Overview</Text>
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>312%</Text>
          <Text style={styles.statLabel}>Aggregate ROI</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>14/16</Text>
          <Text style={styles.statLabel}>WIG Completion</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>92%</Text>
          <Text style={styles.statLabel}>Trust Index</Text>
        </View>
      </View>

      {/* Active Projects Table */}
      <Text style={styles.sectionTitle}>Engagement Status</Text>
      <View style={styles.table}>
        <View style={[styles.tableRow, styles.tableHeader]}>
          <View style={styles.tableCol}><Text style={[styles.tableCell, {color: '#FFF'}]}>Project</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, {color: '#FFF'}]}>Client</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, {color: '#FFF'}]}>Progress</Text></View>
          <View style={styles.tableCol}><Text style={[styles.tableCell, {color: '#FFF'}]}>Value Created</Text></View>
        </View>
        {projects.map((p, i) => (
          <View style={styles.tableRow} key={i}>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{p.name}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{p.client}</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}>{p.progress}%</Text></View>
            <View style={styles.tableCol}><Text style={[styles.tableCell, styles.impactText]}>Verified ROI</Text></View>
          </View>
        ))}
      </View>

      <Text style={styles.footer}>
        © 2026 Dimensions Management Consultants. Confidential Business Intelligence.
      </Text>
    </Page>
  </Document>
);

export default ExecutiveReportPDF;